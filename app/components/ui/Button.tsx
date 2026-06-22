import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

export default function Button({children, className, ...rest}: ButtonProps) {
    return(
        <button
            {...rest}
            className={clsx(
                "flex h-10 items-center justify-center rounded-lg bg-gray-950 dark:bg-gray-50 px-4 text-sm font-medium text-white dark:text-black transition-colors hover:bg-gray-800 hover:dark:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-800 focus-visible:dark:outline-gray-300 active:bg-gray-600 active:dark:bg-gray-300 aria-disabled:cursor-not-allowed aria-disabled:opacity-50 cursor-pointer",
                className,
            )}
        >
            {children}
        </button>
    )
}