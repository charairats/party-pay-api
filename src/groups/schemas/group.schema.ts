import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Group {
    @Prop({ required: true, trim: true })
    name!: string;

    @Prop({ default: '', trim: true })
    description!: string;

    @Prop({ default: 'A', type: String }) // A, B, C
    type!: string;

    @Prop({ default: 'active', type: String }) // active, inactive
    status!: string;

    @Prop({ default: [], type: [String] })
    members!: string[];
}

export const GroupSchema = SchemaFactory.createForClass(Group);