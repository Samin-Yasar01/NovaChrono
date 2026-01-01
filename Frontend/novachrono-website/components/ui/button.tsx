import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
        const variants = {
            primary: 'bg-gold-500 text-gunmetal-900 hover:bg-gold-600 border border-transparent shadow-md hover:shadow-lg',
            outline: 'bg-transparent text-gold-500 border border-gold-500 hover:bg-gold-500/10',
            ghost: 'bg-transparent text-gray-300 hover:text-white hover:bg-white/5',
        };

        const sizes = {
            sm: 'px-3 py-1.5 text-sm',
            md: 'px-6 py-3 text-base',
            lg: 'px-8 py-4 text-lg font-semibold',
        };

        return (
            <button
                ref={ref}
                disabled={isLoading || props.disabled}
                className={cn(
                    'inline-flex items-center justify-center rounded-sm transition-all duration-300 font-medium tracking-wide disabled:opacity-50 disabled:cursor-not-allowed active:scale-95',
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {children}
            </button>
        );
    }
);

Button.displayName = 'Button';

export default Button;
