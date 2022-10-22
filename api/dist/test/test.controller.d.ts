import { TestService } from './test.service';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
export declare class TestController {
    private readonly testService;
    constructor(testService: TestService);
    create(createTestDto: CreateTestDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateTestDto: UpdateTestDto): string;
    remove(id: string): string;
}
