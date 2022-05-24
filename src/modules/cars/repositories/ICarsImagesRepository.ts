import { ICreateCarImageDTO } from "../dtos/ICreateCarImageDTO";
import { CarImage } from "../infra/typeorm/entities/CarImage";

interface ICarsImagesRepository {
  create(carImage: ICreateCarImageDTO): Promise<CarImage>;
}

export { ICarsImagesRepository };
