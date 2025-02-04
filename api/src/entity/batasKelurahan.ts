import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "geometry", spatialFeatureType: "Polygon", srid: 4326 })
  geom!: string;

  @Column()
  KD_PROV!: string;

  @Column()
  KD_KAB!: string;

  @Column()
  KD_KEC!: string;

  @Column()
  KD_KEL!: string;

  @Column()
  NM_KEL!: string;
}
