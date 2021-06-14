import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import GabaritosRepository from '../repositories/GabaritosRepository';
import AlunoSimuladosRepository from '../repositories/AlunoSimuladosRepository';
import SimuladosRepository from '../repositories/SimuladosRepository';

class SimuladoController {
  async createAlunoSimulado(request: Request, response: Response) {
    const {
      userToken: { id },
      horaInicio,
      horaFimMax,
    } = request.body;

    const alunoSimuladosRepository = getCustomRepository(
      AlunoSimuladosRepository,
    );

    const newAlunoSimulado = alunoSimuladosRepository.create({
      user_id: id,
      horaInicio,
      horaFimMax,
    });
    await alunoSimuladosRepository.save(newAlunoSimulado);

    response.status(201).json(newAlunoSimulado);
  }

  async showAlunoSimulado(request: Request, response: Response) {
    const {
      userToken: { id },
    } = request.body;

    const alunoSimuladosRepository = getCustomRepository(
      AlunoSimuladosRepository,
    );

    const alunosimulado = await alunoSimuladosRepository.find({ user_id: id });

    response.status(200).json(alunosimulado);
  }

  async getSimuladoQ1(request: Request, response: Response) {
    // const {
    //   userToken: { id },
    // } = request.body;
    const { numModelo } = request.params;

    const gabaritosRepository = getCustomRepository(GabaritosRepository);

    const query = `SELECT g.modelo, g.materia, g.pergunta, g.enunciado, g.resp_a, g.resp_b, g.resp_c,
    g.resp_d, g.resp_e, g.img FROM gabaritos g WHERE modelo = ${numModelo} ORDER BY pergunta`;

    const gabaritos = await gabaritosRepository.query(query);

    response.status(200).json(gabaritos);
  }

  async storeSimulado(request: Request, response: Response) {
    const {
      userToken: { id },
      modelo,
      pergunta,
      selecionado,
    } = request.body;
    // idUser

    const gabaritosRepository = getCustomRepository(GabaritosRepository);

    const gabaritos = await gabaritosRepository.find({ modelo, pergunta });

    const correto = selecionado === gabaritos[0].correta ? 's' : 'n';

    const simuladosRepository = getCustomRepository(SimuladosRepository);

    const newSimulado = simuladosRepository.create({
      user_id: id,
      modelo,
      pergunta,
      selecionado,
      acertou: correto,
    });
    await simuladosRepository.save(newSimulado);

    response.status(200).json(newSimulado);
  }

  async getNumeroModelo(request: Request, response: Response) {
    const numeroModelo = Math.floor(Math.random() * 4) + 1;

    response.status(200).json({ numeroModelo });
  }

  async indexSimulado(request: Request, response: Response) {
    const {
      userToken: { id },
    } = request.body;
    // const { id } = request.params;

    const simuladosRepository = getCustomRepository(SimuladosRepository);

    const query = `SELECT g.modelo, g.materia, g.pergunta, g.enunciado, g.resp_a, g.resp_b, g.resp_c,
    g.resp_d, g.resp_e, g.img, s.user_id FROM gabaritos g LEFT JOIN simulados s on g.modelo = s.modelo
    and g.pergunta = s.pergunta + 1 WHERE s.user_id = '${id}' ORDER BY g.pergunta DESC`;

    const simulado = await simuladosRepository.query(query);

    response.status(200).json(simulado);
  }
}

export default SimuladoController;
