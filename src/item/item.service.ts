import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Readable } from 'stream';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDEINARY_CLOUD_NAME,
  api_key: process.env.CLOUDEINARY_API_KEY,
  api_secret: process.env.CLOUDEINARY_API_SECRET,
});

interface ContactData {
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  pickupDate?: string;
  consent?: boolean;
}

interface ItemData {
  itemName: string;
  description: string;
  condition: string;
  issues?: string;
  images?: string[];
  imageUrls?: string[];
  estimatedValue: number;
  quantity: number;
  range?: string;
  confidence?: string;
}

@Injectable()
export class ItemService {
  constructor(private prisma: PrismaService) {}

  async getAllItems() {
    return await this.prisma.item.findMany();
  }

  async getItemById(id: number) {
    return await this.prisma.item.findUnique({ where: { id } });
  }

  async deleteItem(id: number) {
    return await this.prisma.item.delete({ where: { id } });
  }

  async createItem(
    contactDataRaw: string,
    itemsDataRaw: string,
    files: Express.Multer.File[],
  ) {
    try {
      // Parse incoming JSON strings
      const contactData = JSON.parse(contactDataRaw);
      const itemsData = JSON.parse(itemsDataRaw);

      let imageIndex = 0;

      // Upload images to Cloudinary and assign URLs to each item.images[]
      for (const item of itemsData) {
        item.images = [];

        const imageCount = item.imageUrls?.length || 0;

        for (let i = 0; i < imageCount; i++) {
          const file = files[imageIndex];
          if (!file) break;

          const uploadResult = await new Promise<any>((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
              {
                folder: 'items',
                resource_type: 'auto',
              },
              (error, result) => {
                if (error) return reject(error);
                resolve(result);
              },
            );

            // Use native Node.js Readable stream instead of streamifier
            const readableStream = new Readable();
            readableStream.push(file.buffer);
            readableStream.push(null);
            readableStream.pipe(uploadStream);
          });

          item.images.push(uploadResult.secure_url);
          imageIndex++;
        }
      }

      // Create contact and items in a transaction
      const savedData = await this.prisma.$transaction(async (tx) => {
        const createdContact = await tx.contact.create({
          data: {
            firstName: contactData.firstName,
            lastName: contactData.lastName,
            email: contactData.email,
            phone: contactData.phone,
            address: contactData.address,
            city: contactData.city,
            state: contactData.state,
            zipCode: contactData.zipCode,
            pickupDate: new Date(contactData.pickupDate),
            consent: contactData.consent,
          },
        });

        const createdItems = await Promise.all(
          itemsData.map((item) =>
            tx.item.create({
              data: {
                itemName: item.itemName,
                description: item.description,
                quantity: item.quantity,
                condition: item.condition,
                issues: item.issues,
                images: item.images,
                estimatedValue: item.estimatedValue,
                range: item.range,
                confidence: item.confidence,
                contactId: createdContact.id,
              },
            }),
          ),
        );

        return {
          contact: createdContact,
          items: createdItems,
        };
      });

      return {
        success: true,
        message: 'Contact and items created successfully',
        data: savedData,
      };
    } catch (error) {
      console.error('Error creating contact and items:', error);
      throw new HttpException(
        'Failed to create contact and items',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
