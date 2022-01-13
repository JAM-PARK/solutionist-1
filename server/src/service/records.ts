import errorGenerator from '../error/errorGenerator';
import { MoreThan } from 'typeorm';
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { SolveRecordsRepository } from '../database/repository/solveRecords';
import { SetsRepository } from '../database/repository/sets';

@Service()
export class RecordsService {
  constructor(
    @InjectRepository() private recordRepo: SolveRecordsRepository,
    @InjectRepository() private setsRepo: SetsRepository
  ) {}

  async makeRecord(setId: number, userId: number): Promise<number> {
    // 해당하는 세트가 없는 경우
    await this.setsRepo.findOne(setId).then((result) => {
      if (!result) {
        errorGenerator({ statusCode: 400 });
      }
    });
    // solveRecords 테이블에 삽입
    const recordId = await this.recordRepo
      .save({ setId, userId })
      .then((result) => (result ? result.id : null));
    // solvedRecords 삽입에 실패한 경우
    if (!recordId) {
      errorGenerator({ statusCode: 500 });
    }
    return recordId;
  }

  async submitRecord(recordId: number, answerRate: number) {
    // answerRate가 유효하지 않을 경우
    if (answerRate < 0 || answerRate > 100 || !Number(answerRate)) {
      errorGenerator({ statusCode: 400 });
    }

    // id에 해당하는 레코드 있는지 확인
    await this.recordRepo.save({ id: recordId, answerRate: answerRate });

    return recordId;
  }

  // 해당 세트를 푼 유저를 카운트
  async countRecord(setId: number) {
    return await this.recordRepo.count({
      where: {
        setId,
        answerRate: MoreThan(-1),
      },
    });
  }
}
