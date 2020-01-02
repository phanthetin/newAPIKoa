import DB from './db';
import Product from './product';
import ProductSample from './product_sample';
import ProductEntity from './product_entity';
import ProductEntityLog from './product_entity_log';
import ProductCode from './product_code';
import ProductLog from './product_log';
import Group from './group';
import Order from './order';
import OrderDetail from './order_detail';
import OrderLog from './order_log';
import Properties from './properties';
import Unit from './unit';
import User from './users';
import DeliveryAddress from './delivery_address';
import Member from './member';
import CustomerContact from './customer_contact';
import Location from './location';
import Bank from './bank';
import BankBranch from './bank_branch';
import BankToMember from './bank_to_member';
import RbacRoles from './rbac_roles';
import RbacModule from './rbac_module';
import RbacAction from './rbac_action';
import UserRoles from './user_roles';


//#region -- RbacAction
RbacAction.belongsTo(RbacModule,{
  as:"module_detail",
  foreignKey: 'module_id',
  sourceKey : 'id'
});
//#region -- RbacModule
RbacModule.hasMany(RbacAction,{
  as:"list_actions",
  foreignKey: 'module_id',
  sourceKey : 'id'
});

//#region -- UserRoles
UserRoles.belongsTo(RbacRoles,{
  as:"role_detail",
  foreignKey: 'roles_id',
  sourceKey : 'id'
});

UserRoles.belongsTo(User,{
  as:"user_detail",
  foreignKey: 'user_id',
  sourceKey : 'id'
})

//#region -- RbacModule
RbacModule.hasMany(RbacAction,{
  as:"actions",
  foreignKey: 'module_id',
  sourceKey : 'id'
})


//#region  -- Member
CustomerContact.belongsTo(Member, {
  as: 'member',
  foreignKey: 'member_id',
  targetKey: 'id'
});

CustomerContact.belongsTo(Location, {
  as: 'country',
  foreignKey: 'country_id',
  sourceKey: 'id',
  scope:{
    type: Location.TYPE_COUNTRY
  }
});
CustomerContact.belongsTo(Location, {
  as: 'city',
  foreignKey: 'city_id',
  sourceKey: 'id',
  scope:{
    type: Location.TYPE_CITY_PROVINCE
  }
});
CustomerContact.belongsTo(Location, {
  as: 'district',
  foreignKey: 'district_id',
  sourceKey: 'id',
  scope:{
    type: Location.TYPE_DICSTRICT
  }
});

//#region  -- Member
Member.hasMany(CustomerContact, {
  as: 'customer_contact',
  foreignKey: 'member_id',
  sourceKey: 'id',
});

// Member.hasMany(DeliveryAddress, {
//   as: 'delivery_address',
//   foreignKey: 'member_id',
//   sourceKey: 'id',
// });

Member.hasMany(BankToMember, {
  as: 'bank_branch',
  foreignKey: 'member_id',
  sourceKey: 'id',
});

Member.belongsTo(Location, {
  as: 'country',
  foreignKey: 'country_id',
  sourceKey: 'id',
  scope:{
    type: Location.TYPE_COUNTRY
  }
});
Member.belongsTo(Location, {
  as: 'city',
  foreignKey: 'city_id',
  sourceKey: 'id',
  scope:{
    type: Location.TYPE_CITY_PROVINCE
  }
});
Member.belongsTo(Location, {
  as: 'district',
  foreignKey: 'district_id',
  sourceKey: 'id',
  scope:{
    type: Location.TYPE_DICSTRICT
  }
});

//#region  -- BANK
Bank.hasMany(BankBranch, {
  as: 'branchs',
  foreignKey: 'bank_id',
  sourceKey: 'id',
});

BankToMember.belongsTo(BankBranch, {
  as: 'branch_detail',
  foreignKey: 'bank_branch_id',
  sourceKey: 'id',
});
BankToMember.belongsTo(Bank, {
  as: 'bank_detail',
  foreignKey: 'bank_id',
  sourceKey: 'id',
});

BankBranch.belongsTo(Bank, {
  as: 'bank_detail',
  foreignKey: 'bank_id',
  sourceKey: 'id',
});

BankBranch.belongsTo(Location, {
  as: 'country',
  foreignKey: 'country_id',
  sourceKey: 'id',
  scope:{
    type: Location.TYPE_COUNTRY
  }
});
BankBranch.belongsTo(Location, {
  as: 'city',
  foreignKey: 'city_id',
  sourceKey: 'id',
  scope:{
    type: Location.TYPE_CITY_PROVINCE
  }
});
BankBranch.belongsTo(Location, {
  as: 'district',
  foreignKey: 'district_id',
  sourceKey: 'id',
  scope:{
    type: Location.TYPE_DICSTRICT
  }
});
//#region  -- Order
Order.hasMany(OrderDetail, {
  as: 'details',
  foreignKey: 'order_id',
  sourceKey: 'id'
});
//#endregion

//#region  -- Order Detail
OrderDetail.hasMany(ProductEntity, {
  as: 'list_product_entity',
  foreignKey: 'order_detail_id',
  sourceKey: 'id'
});

OrderDetail.belongsTo(Order, {
  as: 'order',
  foreignKey: 'order_id',
  targetKey: 'id'
});
//#endregion

//#region  -- Product Entity
ProductEntity.belongsTo(ProductCode, {
  as: 'product_code_info',
  foreignKey: 'product_code_id',
  targetKey: 'id'
});

ProductEntity.belongsTo(OrderDetail, {
  as: 'order_detail',
  foreignKey: 'order_detail_id',
  targetKey: 'id'
});
ProductEntity.belongsTo(Order, {
  as: 'order',
  foreignKey: 'order_id',
  targetKey: 'id'
});
//#endregion

//#region  -- Product Code
ProductCode.hasOne(ProductEntity, {
  as: 'product_entity',
  foreignKey: 'product_code_id',
  sourceKey: 'id'
});
//#endregion
//#region  -- Product
Product.belongsTo(Location, {
  as: 'origin',
  foreignKey: 'origin_id',
  targetKey: 'id'
});

Product.hasMany(ProductEntity, {
  as: 'product_entity',
  foreignKey: 'product_id',
  targetKey: 'id'
});

Product.belongsTo(Group, {
  as: 'group',
  foreignKey: 'group_id',
  targetKey: 'id'
});
//#region  -- Product Sample
ProductSample.belongsTo(Location, {
  as: 'origin',
  foreignKey: 'origin_id',
  targetKey: 'id'
});

ProductSample.belongsTo(Group, {
  as: 'group',
  foreignKey: 'group_id',
  targetKey: 'id'
});
//#endregion

//#region  -- Group
Group.belongsTo(Group, {
  as: 'parent',
  foreignKey: 'parent_id',
  targetKey: 'id'
});
//#endregion

export {
    DB,
    Product,
    Properties,
    ProductCode,
    ProductEntity,
    ProductEntityLog,
    ProductLog,
    Group,
    Order,
    OrderDetail,
    OrderLog,
    Unit,
    User,
    DeliveryAddress,
    Member,
    CustomerContact,
    Location,
    ProductSample,
    Bank,
    BankBranch,
    BankToMember,
    RbacRoles,
    RbacModule,
    RbacAction,
    UserRoles
  }

