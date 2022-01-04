import express, { Request, Response } from 'express';
import { ISets, IProblems, IChoices } from '../../../interface/sets';

const add = async (req: Request, res: Response) => {
  //console.log(req.body);

  console.log(typeof req.body['choices']);
  const set: ISets = { title: req.body['title'], description: req.body['description'] };
  const problems: IProblems[] = req.body['problems'];
  const choices: IChoices[] = req.body['choices'];

  console.log('set', set);
  console.log('problems', problems[0].index);
  console.log('choices', choices);
  res.send();
};
export default add;
