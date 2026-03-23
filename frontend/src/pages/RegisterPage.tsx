import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Brain, Mail, Lock, User, MessageCircle, Eye, EyeOff, ArrowLeft, CheckCircle, Shield } from 'lucide-react';
import { Button } from '../components/ui';
import { authApi } from '../services/auth';

type RegisterMethod = 'email' | 'phone';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [method, setMethod] = useState<RegisterMethod>('email');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const passwordRequirements = [
    { met: password.length >= 8, text: '至少8个字符' },
    { met: /[A-Z]/.test(password), text: '包含大写字母' },
    { met: /[a-z]/.test(password), text: '包含小写字母' },
    { met: /[0-9]/.test(password), text: '包含数字' },
  ];

  const sendCode = useCallback(async () => {
    if (!phone) {
      setError('请输入手机号');
      return;
    }
    if (phone.length !== 11) {
      setError('请输入正确的手机号');
      return;
    }
    try {
      await authApi.sendCode(phone);
      setSuccess('验证码已发送');
      setError('');
      setCountdown(60);
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch {
      setError('发送验证码失败，请稍后重试');
    }
  }, [phone]);

  const handleRegister = useCallback(async () => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (method === 'email') {
        if (!username || !email || !password || !confirmPassword) {
          setError('请填写所有字段');
          setLoading(false);
          return;
        }
        if (password !== confirmPassword) {
          setError('两次密码输入不一致');
          setLoading(false);
          return;
        }
        if (!passwordRequirements.every(r => r.met)) {
          setError('密码不符合要求');
          setLoading(false);
          return;
        }
        await authApi.register({ username, email, password });
        setSuccess('注册成功！即将跳转到登录页面...');
        setTimeout(() => navigate('/login'), 1500);
      } else {
        if (!username || !phone || !code) {
          setError('请填写所有字段');
          setLoading(false);
          return;
        }
        if (phone.length !== 11) {
          setError('请输入正确的手机号');
          setLoading(false);
          return;
        }
        if (code.length !== 6) {
          setError('验证码格式错误');
          setLoading(false);
          return;
        }
        await authApi.register({ username, phone, password: code });
        setSuccess('注册成功！即将跳转到登录页面...');
        setTimeout(() => navigate('/login'), 1500);
      }
    } catch (err: unknown) {
      const error = err as { response?: { data?: { detail?: string } } };
      setError(error.response?.data?.detail || '注册失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  }, [method, username, email, password, confirmPassword, phone, code, navigate]);

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/30 via-slate-900 to-slate-900"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]"></div>
      
      <div className="relative w-full max-w-md">
        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl p-8">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-slate-500 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            返回首页
          </button>

          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-600/30">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">注册 ResumeAlign</h1>
            <p className="text-slate-400 mt-2">开启AI求职新体验</p>
          </div>

          <div className="flex gap-2 mb-6 bg-slate-800/50 p-1 rounded-xl">
            <button
              onClick={() => setMethod('email')}
              className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
                method === 'email' 
                  ? 'bg-slate-700 text-white shadow-sm' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              邮箱注册
            </button>
            <button
              onClick={() => setMethod('phone')}
              className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
                method === 'phone' 
                  ? 'bg-slate-700 text-white shadow-sm' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              手机注册
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg text-sm">
              {success}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">用户名</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="设置用户名"
                  className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {method === 'email' ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">邮箱</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">密码</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="设置密码"
                      className="w-full pl-10 pr-12 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {password && (
                    <div className="mt-2 space-y-1">
                      {passwordRequirements.map((req, i) => (
                        <div key={i} className={`flex items-center gap-2 text-xs ${req.met ? 'text-emerald-400' : 'text-slate-500'}`}>
                          <CheckCircle className="w-3 h-3" />
                          {req.text}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">确认密码</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="再次输入密码"
                      className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">手机号</label>
                  <div className="relative">
                    <MessageCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="请输入手机号"
                      className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">验证码</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="请输入验证码"
                      className="flex-1 px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    <button
                      onClick={sendCode}
                      disabled={countdown > 0}
                      className="px-4 py-3 bg-slate-700 text-slate-300 rounded-lg font-medium hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap transition-all"
                    >
                      {countdown > 0 ? `${countdown}秒` : '获取验证码'}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          <Button
            onClick={handleRegister}
            loading={loading}
            className="w-full mt-6 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 border-0"
            size="lg"
          >
            注册
          </Button>

          <p className="text-center text-sm text-slate-500 mt-6">
            已有账号？{' '}
            <Link to="/login" className="text-blue-400 hover:text-blue-300 font-medium">
              立即登录
            </Link>
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 text-xs text-slate-500 mt-6">
          <Shield className="w-3 h-3" />
          <span>注册即表示同意</span>
          <Link to="/terms" className="text-blue-400 hover:text-blue-300">服务条款</Link>
          <span>和</span>
          <Link to="/privacy" className="text-blue-400 hover:text-blue-300">隐私政策</Link>
        </div>
      </div>
    </div>
  );
};
