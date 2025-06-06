// components/AutoTurnstileModal.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { Turnstile, TurnstileInstance } from '@marsidev/react-turnstile';

const AutoTurnstileModal = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [isVisible, setIsVisible] = useState(false);
    const [verificationStatus, setVerificationStatus] = useState<'pending' | 'verifying' | 'success' | 'error'>('pending');
    const [message, setMessage] = useState('');
    const turnstileRef = useRef<TurnstileInstance>(null);

    // 组件加载后显示弹窗（开发环境添加延迟避免频繁验证）
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsOpen(true);
            setIsVisible(true);
        }, process.env.NODE_ENV === 'development' ? 500 : 0);
        return () => clearTimeout(timer);
    }, []);

    // 处理验证成功的回调
    const handleVerificationSuccess = async (token: string) => {
        try {
            setVerificationStatus('verifying');
            setMessage('正在验证...');

            // 发送到后台验证
            const response = await fetch('/api/verify-turnstile', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token })
            });

            const data = await response.json();

            if (data.success) {
                setVerificationStatus('success');
                setMessage('验证成功！');

                // 短暂显示成功信息后关闭弹窗
                setTimeout(() => {
                    setIsVisible(false);
                    setTimeout(() => setIsOpen(false), 300); // 等待动画完成
                }, 1000);
            } else {
                throw new Error('服务器验证失败');
            }
        } catch (error: any) {
            setVerificationStatus('error');
            setMessage(error.message || '验证失败，请重试');
            turnstileRef.current?.reset(); // 重置验证
        }
    };

    // 处理关闭弹窗
    const closeModal = () => {
        setIsVisible(false);
        setTimeout(() => setIsOpen(false), 300);
    };

    if (!isOpen) return null;

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${isVisible ? 'bg-black/50' : 'bg-transparent'}`}>
            <div
                className={`relative bg-white rounded-xl shadow-xl w-full max-w-md transform transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
                <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 rounded-full p-1 hover:bg-gray-100 transition-colors"
                    aria-label="关闭验证"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="p-6 text-center">
                    <div className="mx-auto mb-4 flex items-center justify-center">
                        {verificationStatus === 'success' ? (
                            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                        ) : verificationStatus === 'error' ? (
                            <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                                <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        ) : (
                            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                                <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                        )}
                    </div>

                    <h3 className="text-xl font-semibold text-gray-800">
                        {verificationStatus === 'pending' && '安全验证'}
                        {verificationStatus === 'verifying' && '验证中...'}
                        {verificationStatus === 'success' && '验证成功'}
                        {verificationStatus === 'error' && '验证失败'}
                    </h3>

                    <p className="mt-2 text-gray-600">
                        {verificationStatus === 'pending' && '请完成以下验证以继续'}
                        {verificationStatus === 'verifying' && '正在验证您的身份，请稍候...'}
                        {verificationStatus === 'success' && '验证成功，您可以安全地继续使用网站'}
                        {verificationStatus === 'error' && message}
                    </p>

                    <div className="mt-6">
                        {verificationStatus === 'pending' && (
                            <Turnstile
                                ref={turnstileRef}
                                siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''}
                                onSuccess={handleVerificationSuccess}
                                onError={() => {
                                    setVerificationStatus('error');
                                    setMessage('验证组件加载失败，请刷新页面后重试');
                                }}
                                onExpire={() => {
                                    setVerificationStatus('error');
                                    setMessage('验证超时，请重试');
                                    setTimeout(() => {
                                        setVerificationStatus('pending');
                                        setMessage('');
                                        turnstileRef.current?.reset();
                                    }, 1500);
                                }}
                                options={{
                                    theme: 'light',
                                    size: 'normal',
                                    appearance: 'execute'
                                }}
                                className="mx-auto"
                            />
                        )}

                        {verificationStatus === 'error' && (
                            <button
                                onClick={() => {
                                    setVerificationStatus('pending');
                                    setMessage('');
                                    turnstileRef.current?.reset();
                                }}
                                className="mt-4 w-full inline-flex justify-center items-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                重试验证
                            </button>
                        )}

                        {verificationStatus === 'success' && (
                            <button
                                onClick={closeModal}
                                className="mt-4 w-full inline-flex justify-center items-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                                确认
                            </button>
                        )}
                    </div>
                </div>

                <div className="bg-gray-50 px-6 py-3 rounded-b-xl text-center">
                    <p className="text-xs text-gray-500">
                        此验证由 Cloudflare Turnstile 提供支持，帮助我们防止机器人滥用
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AutoTurnstileModal;