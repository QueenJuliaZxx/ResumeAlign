import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Lock, Camera, Save, ArrowLeft, Shield } from 'lucide-react';
import { Button, Card } from '../components/ui';
import { useAppStore } from '../store';
import { authApi } from '../services/auth';

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAppStore();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    phone: user?.phone || '',
    avatar: user?.avatar || '',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [showPasswordForm, setShowPasswordForm] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async () => {
    if (!user) return;
    
    setLoading(true);
    setMessage(null);
    
    try {
      const updatedUser = await authApi.updateProfile({
        username: formData.username,
        email: formData.email,
        phone: formData.phone,
        avatar: formData.avatar,
      });
      setUser(updatedUser);
      setIsEditing(false);
      setMessage({ type: 'success', text: '个人资料已更新' });
    } catch (err: unknown) {
      const error = err as { response?: { data?: { detail?: string } } };
      setMessage({ type: 'error', text: error.response?.data?.detail || '更新失败，请稍后重试' });
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (!user) return;
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: 'error', text: '两次密码输入不一致' });
      return;
    }
    
    if (passwordData.newPassword.length < 8) {
      setMessage({ type: 'error', text: '密码至少8个字符' });
      return;
    }
    
    setLoading(true);
    setMessage(null);
    
    try {
      await authApi.changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setShowPasswordForm(false);
      setMessage({ type: 'success', text: '密码修改成功' });
    } catch (err: unknown) {
      const error = err as { response?: { data?: { detail?: string } } };
      setMessage({ type: 'error', text: error.response?.data?.detail || '修改失败，请稍后重试' });
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-3xl mx-auto px-6">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-700 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          返回首页
        </button>

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-800">个人资料</h1>
          <p className="text-slate-500 mt-1">管理您的账户信息</p>
        </div>

        {message && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.type === 'success' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
          }`}>
            {message.text}
          </div>
        )}

        <Card className="p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-slate-800">基本信息</h2>
            {!isEditing ? (
              <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                编辑资料
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => {
                  setIsEditing(false);
                  setFormData({
                    username: user.username,
                    email: user.email || '',
                    phone: user.phone || '',
                    avatar: user.avatar || '',
                  });
                }}>
                  取消
                </Button>
                <Button size="sm" onClick={handleSaveProfile} loading={loading}>
                  保存
                </Button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-6 mb-8">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center overflow-hidden">
                {formData.avatar ? (
                  <img src={formData.avatar} alt={formData.username} className="w-full h-full object-cover" />
                ) : (
                  <User className="w-12 h-12 text-indigo-500" />
                )}
              </div>
              {isEditing && (
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white hover:bg-indigo-600">
                  <Camera className="w-4 h-4" />
                </button>
              )}
            </div>
            <div>
              <p className="text-sm text-slate-500">头像</p>
              <p className="text-xs text-slate-400 mt-1">点击更换头像，建议尺寸 200x200</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">用户名</label>
              {isEditing ? (
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              ) : (
                <p className="text-slate-800 py-3">{user.username}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">邮箱</label>
              {isEditing ? (
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="绑定邮箱"
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              ) : (
                <p className="text-slate-800 py-3">{user.email || '未绑定'}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">手机号</label>
              {isEditing ? (
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="绑定手机号"
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              ) : (
                <p className="text-slate-800 py-3">{user.phone || '未绑定'}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">注册时间</label>
              <p className="text-slate-800 py-3">{new Date(user.createdAt).toLocaleDateString('zh-CN')}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-slate-600" />
              <h2 className="text-lg font-semibold text-slate-800">安全设置</h2>
            </div>
            {!showPasswordForm ? (
              <Button variant="outline" size="sm" onClick={() => setShowPasswordForm(true)}>
                修改密码
              </Button>
            ) : (
              <Button variant="outline" size="sm" onClick={() => {
                setShowPasswordForm(false);
                setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
              }}>
                取消
              </Button>
            )}
          </div>

          {showPasswordForm ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">当前密码</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="password"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    placeholder="输入当前密码"
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">新密码</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    placeholder="输入新密码"
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">确认新密码</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    placeholder="再次输入新密码"
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <Button onClick={handleChangePassword} loading={loading} className="w-full mt-4">
                <Save className="w-4 h-4 mr-2" />
                保存新密码
              </Button>
            </div>
          ) : (
            <p className="text-slate-500 text-sm">点击修改密码以保护您的账户安全</p>
          )}
        </Card>
      </div>
    </div>
  );
};
