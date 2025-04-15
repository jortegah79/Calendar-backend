import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { User } from "src/auth/entities/usuario.entity";


export type EventDocument = HydratedDocument<Event>;

@Schema()
export class Event {
    @Prop({
        type: String,
        required: true
    })
    title: string;

    @Prop({
        type: String
    })
    notes: string;

    @Prop({
        type: Date,
        required: true
    })
    start: Date;

    @Prop({
        type: Date,
        required: true
    })
    end: Date;

    @Prop({
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    })
    user: User;

}

export const EventSchema = SchemaFactory.createForClass(Event);