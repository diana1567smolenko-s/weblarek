import './scss/styles.scss';
import {Catalog} from './components/Models/Catalog';
import {Basket} from './components/Models/Basket';
import {Buyer} from './components/Models/Buyer';

import {Api} from './components/base/Api';
import {WebLarekApi} from './components/Models/WebLarekApi';
import {IProduct, IProductsResponse} from "./types";
import {API_URL} from "./utils/constants.ts";

const catalog = new Catalog();
const basket = new Basket();
const buyer = new Buyer();
const invalidBuyer = new Buyer();

const baseApi = new Api(API_URL);
const webLarekApi = new WebLarekApi(baseApi);

console.log('\n=== APP START ===');

webLarekApi.getProducts()
    .then((response: IProductsResponse) => {
        const products: IProduct[] = response.items
        console.log('\n=== CATALOG ===');

        catalog.setProducts(products);

        console.log('Все товары каталога:', catalog.getProducts());

        const firstProduct = products.find(p => p.id === "854cef69-976d-4c2a-a18c-2aa45046c390");
        const secondProduct = products.find(p => p.id === "c101ab44-ed99-4a54-990d-47aa2bb4e7d9");

        if (!firstProduct || !secondProduct) {
            console.log('Товар не найден')
            return;
        }

        console.log('Товар по id:', catalog.getProductById(firstProduct.id));

        catalog.setSelectedProduct(firstProduct);
        console.log('Выбранный товар:', catalog.getSelectedProduct());

        console.log('\n=== BASKET ===');

        basket.addItem(firstProduct);
        basket.addItem(secondProduct);

        console.log('Корзина:', basket.getItems());
        console.log('Сумма:', basket.getTotalPrice());
        console.log('Количество:', basket.getItemsCount());
        console.log('Есть товар:', basket.hasItem(firstProduct.id));

        basket.removeItem(firstProduct);
        console.log('После удаления:', basket.getItems());

        basket.clear();
        console.log('После очистки:', basket.getItems());

        console.log('\n=== BUYER ===');

        buyer.setData({
            payment: 'card',
            email: 'test@mail.com',
            phone: '+123456789',
            address: 'Moscow'
        });

        console.log('Данные покупателя:', buyer.getData());
        console.log('Ошибки:', buyer.validate());

        invalidBuyer.setData({});

        console.log('Данные покупателя:', invalidBuyer.getData());
        console.log('Ошибки:', invalidBuyer.validate());

        buyer.clear();
        console.log('После очистки:', buyer.getData());

        console.log('Каталог:', catalog.getProducts());
        console.log('Корзина:', basket.getItems());
        console.log('Покупатель:', buyer.getData());
    })
    .catch((error) => {
        console.error('Ошибка при загрузке товаров:', error);
    });

