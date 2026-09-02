import React, { useState } from 'react';
import { Eye, EyeOff, Lock, User, AlertCircle, Info, X } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Checkbox } from '../ui/Checkbox';
import { useAuth } from '../../hooks/useAuth';

export const LoginForm = ({ onSuccess }) => {
  const { login, authError, clearError } = useAuth();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false,
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);

  // Field change handler
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear field-specific validation error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
    if (authError) {
      clearError();
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // Form validation rule checks
  const validate = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Email or username is required.';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await login({
        username: formData.username,
        password: formData.password,
        rememberMe: formData.rememberMe,
      });

      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      // Error handled by AuthContext and displayed in banner
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      {/* Generic Authentication Error Alert */}
      {authError && (
        <div
          role="alert"
          className="mb-5 flex items-start gap-3 rounded-lg border border-rose-200 bg-rose-50 p-3.5 text-xs text-rose-800 animate-fadeIn"
        >
          <AlertCircle className="h-4 w-4 shrink-0 text-rose-600 mt-0.5" />
          <div className="flex-1 font-medium">{authError}</div>
          <button
            type="button"
            onClick={clearError}
            className="text-rose-500 hover:text-rose-700 cursor-pointer p-0.5 rounded-sm focus:outline-hidden"
            aria-label="Dismiss error message"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {/* Email / Username Field */}
        <Input
          label="Email / Username"
          name="username"
          type="text"
          value={formData.username}
          onChange={handleChange}
          placeholder="Enter your email or username"
          error={errors.username}
          required
          disabled={isSubmitting}
          autoComplete="username"
          leftIcon={User}
        />

        {/* Password Field */}
        <Input
          label="Password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          error={errors.password}
          required
          disabled={isSubmitting}
          autoComplete="current-password"
          leftIcon={Lock}
          rightElement={
            <button
              type="button"
              onClick={togglePasswordVisibility}
              tabIndex={0}
              className="p-1.5 text-slate-400 hover:text-slate-600 focus:text-blue-600 focus:outline-hidden rounded-md transition-colors cursor-pointer"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              title={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          }
        />

        {/* Remember Me & Forgot Password Row */}
        <div className="flex items-center justify-between pt-1">
          <Checkbox
            label="Remember me"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleChange}
            disabled={isSubmitting}
          />

          <button
            type="button"
            onClick={() => setShowForgotModal(true)}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline focus:outline-hidden focus:ring-1 focus:ring-blue-500 rounded-xs cursor-pointer"
          >
            Forgot Password?
          </button>
        </div>

        {/* LOGIN Button */}
        <div className="pt-2">
          <Button
            type="submit"
            variant="primary"
            size="md"
            fullWidth
            loading={isSubmitting}
            loadingText="Signing in..."
            disabled={isSubmitting}
          >
            LOGIN
          </Button>
        </div>
      </form>

      {/* Forgot Password Modal Notice */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl border border-slate-200">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-slate-900 font-semibold text-base">
                <Info className="h-5 w-5 text-blue-600" />
                <span>Password Recovery Protocol</span>
              </div>
              <button
                type="button"
                onClick={() => setShowForgotModal(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer p-1 rounded-md"
                aria-label="Close modal"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="py-4 text-xs text-slate-600 space-y-2 leading-relaxed">
              <p>
                For security reasons in supermarket/store deployments, password resets must be authorized by your Lead System Administrator.
              </p>
              <p className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-slate-700">
                Please contact the Supermarket IT Helpdesk or check your store terminal security key card.
              </p>
            </div>
            <div className="flex justify-end pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowForgotModal(false)}
              >
                Understood
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
