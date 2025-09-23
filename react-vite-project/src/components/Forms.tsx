import React, { useState } from 'react';
import TitleSection from './TitleSection';

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
                            <label htmlFor="nomeCautelador" className="block text-sm font-medium text-blue-800">
                                Nome do Cautelador
                            </label>
                            <input
                                type="text"
                                id="nomeCautelador"
                                name="nomeCautelador"
                                value={formData.nomeCautelador}
                                onChange={handleInputChange}
                                required
                                className="w-full rounded-lg border border-blue-200 bg-white px-3 py-2.5 text-sm text-blue-900 placeholder-blue-400 shadow-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                placeholder="Digite o nome completo"
                            />
                        </div>

                        <div className="space-y-1">
                            <label htmlFor="contato" className="block text-sm font-medium text-blue-800">
                                Contato
                            </label>
                            <input
                                type="text"
                                id="contato"
                                name="contato"
                                value={formData.contato}
                                onChange={handleInputChange}
                                required
                                className="w-full rounded-lg border border-blue-200 bg-white px-3 py-2.5 text-sm text-blue-900 placeholder-blue-400 shadow-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                placeholder="Telefone ou e-mail"
                            />
                        </div>

                        <div className="space-y-1">
                            <label htmlFor="deOnde" className="block text-sm font-medium text-blue-800">
                                De Onde
                            </label>
                            <input
                                type="text"
                                id="deOnde"
                                name="deOnde"
                                value={formData.deOnde}
                                onChange={handleInputChange}
                                required
                                className="w-full rounded-lg border border-blue-200 bg-white px-3 py-2.5 text-sm text-blue-900 placeholder-blue-400 shadow-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                placeholder="Setor ou departamento"
                            />
                        </div>

                        <div className="space-y-1">
                            <label htmlFor="motivo" className="block text-sm font-medium text-blue-800">
                                Motivo da Cautela
                            </label>
                            <input
                                type="text"
                                id="motivo"
                                name="motivo"
                                value={formData.motivo}
                                onChange={handleInputChange}
                                required
                                className="w-full rounded-lg border border-blue-200 bg-white px-3 py-2.5 text-sm text-blue-900 placeholder-blue-400 shadow-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                placeholder="Descreva o motivo"
                            />
                        </div>

                        <div className="space-y-1">
                            <label htmlFor="previsaoRetorno" className="block text-sm font-medium text-blue-800">
                                Previsão de Retorno
                            </label>
                            <input
                                type="datetime-local"
                                id="previsaoRetorno"
                                name="previsaoRetorno"
                                value={formData.previsaoRetorno}
                                onChange={handleInputChange}
                                required
                                className="w-full rounded-lg border border-blue-200 bg-white px-3 py-2.5 text-sm text-blue-900 shadow-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                            />
                        </div>

                        <div className="space-y-1">
                            <label htmlFor="responsavel" className="block text-sm font-medium text-blue-800">
                                Responsável pela Cautela
                            </label>
                            <input
                                type="text"
                                id="responsavel"
                                name="responsavel"
                                value={formData.responsavel}
                                onChange={handleInputChange}
                                required
                                className="w-full rounded-lg border border-blue-200 bg-white px-3 py-2.5 text-sm text-blue-900 placeholder-blue-400 shadow-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                placeholder="Nome do responsável"
                            />
                        </div>

                        <div className="space-y-1">
                            <label htmlFor="observacoes" className="block text-sm font-medium text-blue-800">
                                Observações
                            </label>
                            <textarea
                                id="observacoes"
                                name="observacoes"
                                value={formData.observacoes}
                                onChange={handleInputChange}
                                rows={3}
                                className="w-full resize-none rounded-lg border border-blue-200 bg-white px-3 py-2.5 text-sm text-blue-900 placeholder-blue-400 shadow-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
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