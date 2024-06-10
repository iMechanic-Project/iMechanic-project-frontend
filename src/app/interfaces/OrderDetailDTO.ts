import { OperationDetailsDTOResponse } from "./OperationDetailsDTOResponse";

export interface OrderDetailDTO {
    workOrderId: string;
    nameWorkshop: string;
    addressWorkshop: string;
    phoneWorkShop: string;
    operationDetails: OperationDetailsDTOResponse[];
}