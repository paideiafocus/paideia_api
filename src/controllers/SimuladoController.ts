import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../repositories/UsersRepository';
import GabaritosRepository from '../repositories/GabaritosRepository';
import AlunoSimuladosRepository from '../repositories/AlunoSimuladosRepository';
import SimuladosRepository from '../repositories/SimuladosRepository';
import { AppError } from '../errors/AppError';

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

    const currentAlunoSimulado = await alunoSimuladosRepository.find({
      user_id: id,
    });

    if (currentAlunoSimulado.length === 0) {
      const newAlunoSimulado = alunoSimuladosRepository.create({
        user_id: id,
        horaInicio,
        horaFimMax,
        horaFimMin: '',
        horaEnvio: '',
      });
      await alunoSimuladosRepository.save(newAlunoSimulado);

      return response.status(200).json(newAlunoSimulado);
    }

    return response.status(204);
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

    const alreadyAnswered = await simuladosRepository.find({
      user_id: id,
      modelo,
      pergunta,
    });

    if (alreadyAnswered.length === 0) {
      const newSimulado = simuladosRepository.create({
        user_id: id,
        modelo,
        pergunta,
        selecionado,
        acertou: correto,
      });
      await simuladosRepository.save(newSimulado);

      return response.status(201).json(newSimulado);
    }

    return response.status(200).json(alreadyAnswered);
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

  async gabaritoSimples(request: Request, response: Response) {
    const {
      userToken: { id },
    } = request.body;

    const simuladosRepository = getCustomRepository(SimuladosRepository);

    const query = `
    SELECT s.modelo, s.pergunta, s.acertou, g.materia, s.selecionado FROM simulados s
    INNER JOIN gabaritos g on s.pergunta = g.pergunta and s.modelo = g.modelo
    WHERE user_id = '${id}' GROUP BY s.pergunta`;

    const gabaritoSimples = await simuladosRepository.query(query);

    response.status(200).json(gabaritoSimples);
  }

  async cadastraSimulado(request: Request, response: Response) {
    const {
      userToken: { id },
      pergunta,
      materia,
      enunciado,
      resp_a,
      resp_b,
      resp_c,
      resp_d,
      resp_e,
      correta,
      img,
    } = request.body;

    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findOne({ id, status: 'admin' });

    if (!user) {
      throw new AppError('Unauthorized!', 401);
    }

    // variaveis recebem requisição para facilitar organização/entendimento
    const alternativaCerta = correta;
    const numeroPergunta = pergunta;
    const diciplina = materia;
    const questao = enunciado;
    const A = resp_a;
    const B = resp_b;
    const C = resp_c;
    const D = resp_d;
    const E = resp_e; // unesp

    function proximaLetra(letra) {
      let proxima = letra;
      switch (proxima) {
        case 'a':
          proxima = 'b';
          break;
        case 'b':
          proxima = 'c';
          break;
        case 'c':
          proxima = 'd';
          break;
        case 'd':
          proxima = 'e'; // unesp
          // proxima = 'a';
          break;
        case 'e': // unesp
          proxima = 'a'; // unesp
          break; // unesp
        default:
          break;
      }
      return proxima;
    }
    const certaModelo1 = alternativaCerta;
    const certaModelo2 = proximaLetra(certaModelo1);
    const certaModelo3 = proximaLetra(certaModelo2);
    const certaModelo4 = proximaLetra(certaModelo3);

    const gabaritosRepository = getCustomRepository(GabaritosRepository);

    const results = [
      {
        modelo: 1,
        pergunta: numeroPergunta,
        materia: diciplina,
        enunciado: questao,
        resp_a: A,
        resp_b: B,
        resp_c: C,
        resp_d: D,
        resp_e: E, // unesp
        correta: certaModelo1,
        img,
      },
      {
        modelo: 2,
        pergunta: numeroPergunta,
        materia: diciplina,
        enunciado: questao,
        // resp_a: D,
        resp_a: E, // unesp
        resp_b: A,
        resp_c: B,
        resp_d: C,
        resp_e: D, // unesp
        correta: certaModelo2,
        img,
      },
      {
        modelo: 3,
        pergunta: numeroPergunta,
        materia: diciplina,
        enunciado: questao,
        // resp_a: C,
        // resp_b: D,
        resp_a: D, // unesp
        resp_b: E, // unesp
        resp_c: A,
        resp_d: B,
        resp_e: C, // unesp
        correta: certaModelo3,
        img,
      },
      {
        modelo: 4,
        pergunta: numeroPergunta,
        materia: diciplina,
        enunciado: questao,
        // resp_a: B,
        // resp_b: C,
        // resp_c: D,
        resp_a: C,
        resp_b: D,
        resp_c: E,
        resp_d: A,
        resp_e: B, // unesp
        correta: certaModelo4,
        img,
      },
    ];

    const newGabarito = gabaritosRepository.create(results);
    await gabaritosRepository.save(newGabarito);

    response.status(201).json(newGabarito);
  }

  async listaGabaritos(request: Request, response: Response) {
    const gabaritosRepository = getCustomRepository(GabaritosRepository);

    const query =
      'SELECT count(*) AS qtdPerguntas FROM gabaritos where modelo = 1';

    const gabaritos = await gabaritosRepository.query(query);

    response.status(200).json(gabaritos[0]);
  }

  async gabaritoCompletoAdm(request: Request, response: Response) {
    const {
      userToken: { id },
    } = request.body;

    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findOne({ id, status: 'admin' });

    if (!user) {
      throw new AppError('Unauthorized!', 401);
    }

    const gabaritosRepository = getCustomRepository(GabaritosRepository);

    const query = `
      SELECT u.name, u.lastname, s.id as question_id, s.user_id, s.modelo, s.pergunta, s.selecionado, s.acertou, g.materia
      FROM simulados s INNER JOIN users u ON s.user_id = u.id
      INNER JOIN gabaritos g ON g.pergunta = s.pergunta AND s.modelo = g.modelo
      GROUP BY s.pergunta, s.user_id
      ORDER BY u.name, s.pergunta
    `;

    const resultados = await gabaritosRepository.query(query);

    response.status(200).json(resultados);
  }
}

export default SimuladoController;
