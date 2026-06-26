import clsx from 'clsx';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({className, ...rest}: InputProps) {
    return(
        <input
            {...rest}
            className={clsx(
                "rounded-md border p-2",
                className,
            )}
        />
    )
}