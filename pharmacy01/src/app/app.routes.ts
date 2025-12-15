import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { HomeadminComponent } from './components/homeadmin/homeadmin/homeadmin.component';
import { CreatecategoryComponent } from './components/homeadmin/category/createcategory/createcategory.component';
import { ListcategoryComponent } from './components/homeadmin/category/listcategory/listcategory.component';
import { CreatesupplierComponent } from './components/homeadmin/supplier/createsupplier/createsupplier.component';
import { ListsuppliersComponent } from './components/homeadmin/supplier/listsuppliers/listsuppliers.component';
import { EditsupplierComponent } from './components/homeadmin/supplier/editsupplier/editsupplier.component';
import { ListusersComponent } from './components/homeadmin/user/listusers/listusers.component';
import { EdituserComponent } from './components/homeadmin/user/edituser/edituser.component';
import { CreateproductComponent } from './components/homeadmin/product/createproduct/createproduct.component';
import { ListproductComponent } from './components/homeadmin/product/listproduct/listproduct.component';
import { ListSaleproductsComponent } from './components/home/sales/list-saleproducts/list-saleproducts.component';
import { SalesComponent } from './components/home/sales/sales/sales.component';
import { BillComponent } from './components/home/sales/bill/bill.component';
import { authGuardGuard } from './core/guards/auth-guard.guard';

export const routes: Routes = [

    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'homeAdmin', component: HomeadminComponent, pathMatch: 'full',  canActivate: [authGuardGuard] },
    { path: 'createCategory', component: CreatecategoryComponent },
    { path: 'listCategory', component: ListcategoryComponent },
    { path: 'createSupplier', component: CreatesupplierComponent },
    { path: 'listSuppliers', component: ListsuppliersComponent },
    { path: 'editSupplier/:id', component: EditsupplierComponent },
    { path: 'listUsers', component: ListusersComponent },
    { path: 'editUser/:id', component: EdituserComponent },
    { path: 'createProduct', component: CreateproductComponent },
    { path: 'listProducts', component: ListproductComponent },
    { path: 'listsaleProducts', component: ListSaleproductsComponent },
    { path: 'Sales', component: SalesComponent},
    { path: 'bill', component: BillComponent},
    {path: '**', redirectTo: 'home', pathMatch: 'full'},
    { path: '', redirectTo: '/home', pathMatch: 'full' }
        

];
