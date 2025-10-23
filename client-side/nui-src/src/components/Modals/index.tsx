import { AddSalaryModal } from "./_components/AddSalary";
import { AddUserGroupModal } from "./_components/AddUserGroup";
import { AddUserItemModal } from "./_components/AddUserItem";
import { AddUserProperty } from "./_components/AddUserProperty";
import { AddUserVehicleModal } from "./_components/AddUserVehicle";
import { AddVehicleModal } from "./_components/AddVehicle";
import { EditSalaryModal } from "./_components/EditSalary";
import { FastActionAddUserItemModal } from "./_components/FastActionAddUserItem";
import { FastActionAddUserMoneyModal } from "./_components/FastActionAddUserMoney";
import { FastActionAddUserVehicle } from "./_components/FastActionAddUserVehicle";
import { FastActionBanUser } from "./_components/FastActionBanUser";
import { InfoPersonalVehicleModal } from "./_components/InfoPersonalVehicle";
import { InfoVehicleModal } from "./_components/InfoVehicle";
import { ItemModal } from "./_components/Items";
import React from "react";
import { RemoveSalaryModal } from "./_components/RemoveSalary";
import { RemoveUserGroupModal } from "./_components/RemoveUserGroup";
import { UserGroupsModal } from "./_components/UserGroups";
import { UserItemsModal } from "./_components/UserItems";
import { UserPropertiesModal } from "./_components/UserProperties";
import { UserVehiclesModal } from "./_components/UserVehicles";
import { useModal } from "../../stores/useModal";

const ModalKeys: { [key: string]: any } = {
  item: ItemModal,
  editsalary: EditSalaryModal,
  removesalary: RemoveSalaryModal,
  addsalary: AddSalaryModal,
  addvehicle: AddVehicleModal,
  infovehicle: InfoVehicleModal,
  usergroups: UserGroupsModal,
  useritems: UserItemsModal,
  adduseritem: AddUserItemModal,
  userproperties: UserPropertiesModal,
  adduserproperty: AddUserProperty,
  fastadduseritem: FastActionAddUserItemModal,
  fastaddusermoney: FastActionAddUserMoneyModal,
  fastadduservehicle: FastActionAddUserVehicle,
  fastbanuser: FastActionBanUser,
  uservehicles: UserVehiclesModal,
  infopersonalvehicle: InfoPersonalVehicleModal,
  adduservehicle: AddUserVehicleModal,
  addusergroup: AddUserGroupModal,
  removeusergroup: RemoveUserGroupModal,
};

export const ModalFrame = () => {
  const modal = useModal();
  return (
    <div className="absolute top-0 left-0 z-50 w-full h-full animate-fadeIn">
      {modal.visible && React.createElement(ModalKeys[modal.visible])}
      <div
        className="absolute top-0 left-0 z-40 w-full h-full bg-black/90"
        onClick={() => modal.close()}
      />
    </div>
  );
};
