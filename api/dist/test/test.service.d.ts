import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
export declare class TestService {
    create(createTestDto: CreateTestDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateTestDto: UpdateTestDto): string;
    remove(id: number): string;
}
