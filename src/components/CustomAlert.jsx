import React from 'react';
import { CheckCircle, XCircle, AlertTriangle, X } from 'lucide-react';

const CustomAlert = ({ isOpen, onClose, type, title, message, onConfirm, confirmText, cancelText }) => {
  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-12 h-12 text-green-500" />;
      case 'error':
        return <XCircle className="w-12 h-12 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="w-12 h-12 text-yellow-500" />;
      case 'confirm':
        return <AlertTriangle className="w-12 h-12 text-accent" />;
      default:
        return <CheckCircle className="w-12 h-12 text-primary" />;
    }
  };

  const getColors = () => {
    switch (type) {
      case 'success':
        return 'border-green-200 bg-green-50';
      case 'error':
        return 'border-red-200 bg-red-50';
      case 'warning':
        return 'border-yellow-200 bg-yellow-50';
      case 'confirm':
        return 'border-accent/20 bg-accent/5';
      default:
        return 'border-primary/20 bg-primary/5';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={`bg-white rounded-2xl shadow-2xl border-2 ${getColors()} max-w-md w-full mx-4 transform transition-all duration-300 scale-100`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center space-x-4">
            {getIcon()}
            <h3 className="text-xl font-bold text-primary font-serif">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {message}
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-100">
          {type === 'confirm' ? (
            <>
              <button
                onClick={onClose}
                className="px-6 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
              >
                {cancelText || 'Cancelar'}
              </button>
              <button
                onClick={() => {
                  onConfirm && onConfirm();
                  onClose();
                }}
                className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {confirmText || 'Confirmar'}
              </button>
            </>
          ) : (
            <button
              onClick={onClose}
              className="px-8 py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Entendido
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomAlert;
