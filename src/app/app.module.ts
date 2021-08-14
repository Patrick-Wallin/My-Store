import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppMaterialModule } from './app-material/app-material.module';
import { CoreModule } from './core/core.module';
import { ProductsModule } from './products/products.module';
import { CartsModule } from './carts/carts.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppMaterialModule,
    CoreModule,
    ProductsModule,
    CartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
