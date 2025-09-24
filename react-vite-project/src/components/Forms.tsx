import React, { useState } from 'react';
import TitleSection from './TitleSection';
import LabelAndInputForm from './LabelAndImputForm';

interface CautelaForm {
    nomeCautelador: string;
    contato: string;
    deOnde: string;
    motivo: string;
    previsaoRetorno: string;
    responsavel: string;
    observacoes: string;
}

const App: React.FC = () => {
    const [formData, setFormData] = useState<CautelaForm>({
        nomeCautelador: '',
        contato: '',
        deOnde: '',
        motivo: '',
        previsaoRetorno: '',
        responsavel: '',
        observacoes: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Dados da cautela:', formData);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-start justify-center px-4 py-8">
            <div className="w-full max-w-md space-y-6">
                <div className="text-center">
                    <TitleSection title="Nova Cautela" subtitle="Preencha os dados abaixo" />
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-1">

                            <LabelAndInputForm 
                                label="Nome do Cautelador"
                                type="text"
                                id="nomeCautelador"
                                name="nomeCautelador"
                                value={formData.nomeCautelador}
                                onChange={handleInputChange}
                                required
                                placeholder="Digite o nome completo"
                            />
                        </div>

                        <div className="space-y-1">
                            <LabelAndInputForm
                                label="Contato"
                                type="text"
                                id="contato"
                                name="contato"
                                value={formData.contato}
                                onChange={handleInputChange}
                                required
                                placeholder="Telefone Celular"
                            />
                        
                        </div>

                        <div className="space-y-1">
                            <LabelAndInputForm
                                label="De Onde"
                                type="text"
                                id="deOnde"
                                name="deOnde"
                                value={formData.deOnde}
                                onChange={handleInputChange}
                                required
                                placeholder="Setor ou departamento"
                            />
                        </div>


                        <div className="space-y-1">
                            <LabelAndInputForm
                                label="Motivo da Cautela"
                                type="text"
                                id="motivo"
                                name="motivo"
                                value={formData.motivo}
                                onChange={handleInputChange}
                                required
                                placeholder="Descreva o motivo"
                            />
                        </div>
                        <div className="space-y-1">
                            <LabelAndInputForm 
                                label="Previsão de Retorno"
                                type="datetime-local"
                                id="previsaoRetorno"
                                name="previsaoRetorno"
                                value={formData.previsaoRetorno}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="space-y-1">
                            <LabelAndInputForm
                                label="Responsável pela Cautela"
                                type="text"
                                id="responsavel"
                                name="responsavel"
                                value={formData.responsavel}
                                onChange={handleInputChange}
                                required
                            />
                        </div>


                        <div className="space-y-1">
                           <LabelAndInputForm 
                                label="Observações"
                                type="text"
                                id="observacoes"
                                name="observacoes"
                                value={formData.observacoes}
                                onChange={handleInputChange}
                                placeholder="Informações adicionais (opcional)"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:bg-blue-800 disabled:opacity-50"
                        >
                            Salvar Cautela
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default App;