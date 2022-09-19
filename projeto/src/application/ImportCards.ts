import { Card } from "../domain/entities/Card";
import BoardRepository from "../domain/repositories/BoardRepository";

export default class ImportCards {
    constructor(readonly boardRepository: BoardRepository){

    }

    async execute(input: Input): Promise<void>{
        const board = await this.boardRepository.get(input.idBoard)
        if(!board) throw new Error("Board does not exists")
        const lines = input.file.toString().split(/\n/)
        for(const line of lines.slice(1)){
            const [columnName, cardTitle, cardEstimative] = line.split(';')
            board.addCard(columnName, cardTitle, parseInt(cardEstimative))
        }
        await this.boardRepository.update(board)
    }
}

type Input = {
    idBoard: number
    file: Buffer
}