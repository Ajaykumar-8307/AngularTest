import { Component, OnInit, Input} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NavbarComponent } from './navbar/navbar.component';
import { HomeBannerComponent } from './home-banner/home-banner.component';

import { Product } from './models/product.model';
import { ProductService } from './product.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, FormsModule, NavbarComponent, HomeBannerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title:any;

  @Input() product!: Product;
  pro: Product[] = [];
  constructor(private productService: ProductService) {}

  async ngOnInit() {
    this.Filter = await this.productService.getProducts();
    this.pro = await this.productService.getProducts();
  }

  // Location Selecter
  demo_loc = '';
  location:string[] = ['Thanjavur','Trichy','Coimbatore','Kumbakkonam'];

  // products = [
  //   {pro_name:'ABC Meals',pro_price: 'Rs.250',pro_loc: 'Trichy',pro_img: 'https://i.ibb.co/pBG9mvDC/img.png' ,com_logo: 'https://i.ibb.co/JFFBB0HH/DMonkey.jpg'},
  //   {pro_name:'Fruits Mix',pro_price: 'Rs.350',pro_loc: 'Thanjavur',pro_img: 'https://www.hotelierindia.com/cloud/2022/03/10/Drunken-Monkey_-Detox-Smoothie-Line.jpeg' ,com_logo: 'https://i.ibb.co/JFFBB0HH/DMonkey.jpg'},
  //   {pro_name:'Natural Juice',pro_price: 'Rs.450',pro_loc: 'Coimbatore',pro_img: 'https://wishboxstudio.in/wp-content/uploads/2020/08/drunken-monkey.jpg' ,com_logo: 'https://i.ibb.co/JFFBB0HH/DMonkey.jpg'},
  //   {pro_name:'Banana Jam',pro_price: 'Rs.450',pro_loc: 'Kumbakkonam',pro_img: 'https://i.pinimg.com/236x/9b/f5/84/9bf584cbb6239f9ed69dd26076dfc5b7.jpg' ,com_logo: 'https://i.ibb.co/JFFBB0HH/DMonkey.jpg'}
  // ]
  Filter = [...this.pro];

  searchTerm = '';
  search() {
    return this.Filter = this.pro.filter(product => 
      product.pro_name.toLowerCase().includes(this.searchTerm.toLowerCase()) && product.pro_loc.toLowerCase().includes(this.demo_loc.toLowerCase())
    );
  }
}