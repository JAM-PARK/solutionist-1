import { Request, Response } from 'express';
import Container from 'typedi';
import { ISolve } from '../../interface/ISets';
import { StatusService } from '../../service/solveStatus';
import errorGenerator from '../../error/errorGenerator';
import { emptyObjectCk } from '../../utils/custom';

const solve = async (req: Request, res: Response) => {
  // 토큰 인증에 실패했을 경우 = 유저 정보가 없을 경우 => 빈 객체 할당
  const solveDTO: ISolve = req.body;

  // 데이터가 누락됐을 경우
  if (emptyObjectCk(solveDTO)) {
    errorGenerator({ statusCode: 400 });
  }

  // solveStatus 테이블 이용을 위한 solveStatus 인스턴스
  const statusServiceInstance: StatusService = Container.get(StatusService);

  // 문제 풀이 기록 삽입
  const solveResponse = await statusServiceInstance.ProblemSolver(solveDTO);

  res.status(201).json(solveResponse);
};
export default solve;
