import { ServicioMecanicoDTO } from "./ServicioMecanicoDTO";

export interface CreateOrdenDTORequest {
    nombreCliente: string;
    direccion: string;
    telefono: string;
    placa: string;
    marca: string;
    modelo: string;
    categoria: string;
    serviciosMecanicos: ServicioMecanicoDTO[];
}