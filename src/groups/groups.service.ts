import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Group } from './schemas/group.schema';

@Injectable()
export class GroupsService {
    constructor(
        @InjectModel(Group.name)
        private readonly groupModel: Model<Group>,
    ) { }

    async findAll() {
        return this.groupModel.find().exec();
    }

    async findOne(id: string) {
        this.validateId(id);

        const group = await this.groupModel.findById(id).exec();

        if (!group) {
            throw new NotFoundException('Group not found');
        }

        return group;
    }

    async create(createGroupDto: CreateGroupDto) {
        const group = new this.groupModel(createGroupDto);
        return group.save();
    }

    async update(id: string, updateGroupDto: UpdateGroupDto) {
        this.validateId(id);

        const group = await this.groupModel
            .findByIdAndUpdate(
                id,
                {
                    name: updateGroupDto.name,
                    description: updateGroupDto.description,
                    type: updateGroupDto.type,
                    status: updateGroupDto.status,
                },
                {
                    new: true,
                    runValidators: true,
                },
            )
            .exec();

        if (!group) {
            throw new NotFoundException('Group not found');
        }

        return group;
    }

    async remove(id: string) {
        this.validateId(id);

        const group = await this.groupModel.findByIdAndDelete(id).exec();

        if (!group) {
            throw new NotFoundException('Group not found');
        }

        return {
            message: 'Group deleted successfully',
            group,
        };
    }

    private validateId(id: string) {
        if (!isValidObjectId(id)) {
            throw new BadRequestException('Invalid group ID');
        }
    }


}
