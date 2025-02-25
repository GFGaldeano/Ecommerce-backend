import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn,
    ManyToMany,
    JoinTable,
  } from 'typeorm';
  import { Order } from './orders.entity';
  import { Product } from './products.entity';
  
  @Entity('order_details')
  export class OrderDetail {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
    price: number;
  
    @OneToOne(() => Order, (order) => order.orderDetail)
    @JoinColumn({ name: 'order_id' })
    order: Order;

    @ManyToMany(() => Product, (product) => product.orderDetails)
    @JoinTable() 
    products: Product[];
  }
  