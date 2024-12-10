import { Paytone_One, Josefin_Sans } from 'next/font/google';

export const paytoneOne = Paytone_One({
    weight: ['400'],
    subsets: ['latin'],
});

export const josefinSans = Josefin_Sans({
    weight: ['400', '700'], // Add the weights you need
    subsets: ['latin'], // Specify subsets
});
