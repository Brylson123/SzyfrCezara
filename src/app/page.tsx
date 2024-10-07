'use client';

import {ChangeEvent, useState} from 'react';


const polishAlphabet: string = 'aąbcćdeęfghijklłmnńoópqrsśtuvwxyzźż';


function cleanText(text: string): string {

    return text
        .toLowerCase()
        .replace(/[^aąbcćdeęfghijklłmnńoópqrsśtuvwxyzźż]/g, '');
}


function caesarCipher(text: string, shift: number): string {
    return text
        .split('')
        .map((char) => {
            const index = polishAlphabet.indexOf(char);
            if (index === -1) return '';
            const newIndex = (index + shift + polishAlphabet.length) % polishAlphabet.length;
            return polishAlphabet[newIndex];
        })
        .join('');
}

export default function Home() {
    const [inputTextEncrypt, setInputTextEncrypt] = useState<string>('');
    const [inputTextDecrypt, setInputTextDecrypt] = useState<string>('');
    const [shiftEncrypt, setShiftEncrypt] = useState<number>(1);
    const [shiftDecrypt, setShiftDecrypt] = useState<number>(1);
    const [outputTextEncrypt, setOutputTextEncrypt] = useState<string>('');
    const [outputTextDecrypt, setOutputTextDecrypt] = useState<string>('');

    const handleEncrypt = (): void => {
        const cleanedText = cleanText(inputTextEncrypt);
        const encryptedText = caesarCipher(cleanedText, shiftEncrypt);
        setOutputTextEncrypt(encryptedText);
    };

    const handleDecrypt = (): void => {
        const cleanedText = cleanText(inputTextDecrypt);
        const decryptedText = caesarCipher(cleanedText, -shiftDecrypt);
        setOutputTextDecrypt(decryptedText);
    };

    const handleEncryptInputChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {

        setInputTextEncrypt(e.target.value);

    };

    const handleDecryptInputChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
        setInputTextDecrypt(e.target.value);
    };

    const handleEncryptShiftChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const value = Math.max(1, Math.min(34, parseInt(e.target.value)));
        setShiftEncrypt(value);
    };

    const handleDecryptShiftChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const value = Math.max(1, Math.min(34, parseInt(e.target.value)));
        setShiftDecrypt(value);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mb-8">
                <h1 className="text-2xl font-bold text-center mb-4">Szyfrowanie - Szyfr Cezara</h1>
                <div className="mb-4">
                    <label htmlFor="inputTextEncrypt" className="block text-sm font-medium text-gray-700">
                        Tekst do zaszyfrowania:
                    </label>
                    <textarea
                        id="inputTextEncrypt"
                        rows={4}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        value={inputTextEncrypt}
                        onChange={handleEncryptInputChange}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="shiftEncrypt" className="block text-sm font-medium text-gray-700">
                        Przesunięcie:
                    </label>
                    <input
                        id="shiftEncrypt"
                        type="number"
                        min={1}
                        max={34}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        value={shiftEncrypt}
                        onChange={handleEncryptShiftChange}
                    />
                </div>
                <div className="flex justify-center mb-4">
                    <button
                        onClick={handleEncrypt}
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
                    >
                        Zaszyfruj
                    </button>
                </div>

                <div>
                    <h2 className="text-lg font-medium mb-2">Wynik:</h2>
                    <p className="bg-gray-100 p-4 rounded-md">{outputTextEncrypt}</p>
                </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h1 className="text-2xl font-bold text-center mb-4">Odszyfrowanie - Szyfr Cezara</h1>
                <div className="mb-4">
                    <label htmlFor="inputTextDecrypt" className="block text-sm font-medium text-gray-700">
                        Tekst do odszyfrowania:
                    </label>
                    <textarea
                        id="inputTextDecrypt"
                        rows={4}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        value={inputTextDecrypt}
                        onChange={handleDecryptInputChange}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="shiftDecrypt" className="block text-sm font-medium text-gray-700">
                        Przesunięcie:
                    </label>
                    <input
                        id="shiftDecrypt"
                        type="number"
                        min={1}
                        max={34}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        value={shiftDecrypt}
                        onChange={handleDecryptShiftChange}
                    />
                </div>

                <div className="flex justify-center mb-4">
                    <button
                        onClick={handleDecrypt}
                        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors"
                    >
                        Odszyfruj
                    </button>
                </div>
                <div>
                    <h2 className="text-lg font-medium mb-2">Wynik:</h2>
                    <p className="bg-gray-100 p-4 rounded-md">{outputTextDecrypt}</p>
                </div>
            </div>
        </div>
    );
}