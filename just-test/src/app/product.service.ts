import { Injectable } from '@angular/core';
import { Product } from './models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly SHEET_ID = '17icJ5ElZflEKiqJjzuCYQ8Z-dmxsn9IAyjK5pugQL4I'; // Replace with your Sheet ID
  private readonly API_KEY = 'AIzaSyAu9OqCNSV5lr_uPytsZcgodxubVxdRvrE'; // Replace with your API key
  private readonly RANGE = 'Sheet1!A:ZZ'; // Adjust the range as needed
  private readonly BASE_URL = `https://sheets.googleapis.com/v4/spreadsheets/${this.SHEET_ID}/values/${this.RANGE}?key=${this.API_KEY}`;

  constructor() {}

  async getProducts(): Promise<Product[]> {
    try {
      const response = await fetch(this.BASE_URL);
      if (!response.ok) throw new Error('Failed to fetch data');
      const data = await response.json();

      const rows = data.values || [];
      const products: Product[] = [];

      // Skip the first row (headers)
      for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        products.push({
          pro_name: row[0] || 'Unknown Product',
          pro_price: row[1] ? Number(row[1]) : 0,
          pro_img: row[2] || 'https://via.placeholder.com/150',
          pro_loc: row[3] || 'No description available',
          com_logo: row[4] || 'https://i.ibb.co/JFFBB0HH/DMonkey.jpg'
        });
      }
      return products;
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  }
}
