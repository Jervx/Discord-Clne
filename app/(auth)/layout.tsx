import { ModeToggle } from "@/components/mode-toggle";
import React from "react";
import { PiDiscordLogoLight } from "react-icons/pi";
type Props = { children: React.ReactNode };

const AuthLayout = (props: Props) => {
    return (
        <div className="h-full relative w-full flex justify-center items-center bg-cover bg-[url('/discord-clne-light.png')] dark:bg-[url('/discord-clne-dark.png')]">
            <ModeToggle className="absolute right-5 top-5" />
            <div className="flex flex-col items-center gap-y-4 w-full lg:w-1/4">
                <PiDiscordLogoLight className="mx-auto text-6xl" />
                <p className="text-center text-4xl mb-5 font-medium">
                    Discord Clne
                </p>
                {props.children}
                <p className="text-sm text-center mt-12 leading-7">
                    This is just a discord clone I made called Discord Clne.
                    This was the full stack discord clone tutorial I followed
                    from{" "}
                    <b>
                        <a
                            className="underline"
                            href="https://www.youtube.com/watch?v=ZbX4Ok9YX94&t=31820s&ab_channel=CodeWithAntonio"
                        >
                            Code With Antonio
                        </a>
                    </b>{" "}
                    in Youtube. I modified some parts too so that it is not as
                    exact as the crashcourse.
                </p>
            </div>
        </div>
    );
};

export default AuthLayout;
