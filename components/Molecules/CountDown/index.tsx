import { FC } from "react";

export interface ICountDownProps {
  timeLeft: number;
}

export const CountDown: FC<ICountDownProps> = ({ timeLeft }) => {
  return (
    <div className="flex gap-5">
      <div>
        <span className="countdown text-2xl">
          <span
            style={
              {
                "--value":
                  Math.floor(timeLeft / (24 * 60 * 60)) > 100
                    ? 99
                    : Math.floor(timeLeft / (24 * 60 * 60)),
              } as {}
            }
          ></span>
        </span>
        days
      </div>
      <div>
        <span className="countdown text-2xl">
          <span
            style={
              {
                "--value": Math.floor((timeLeft % (24 * 60 * 60)) / (60 * 60)),
              } as {}
            }
          ></span>
        </span>
        hours
      </div>
      <div>
        <span className="countdown text-2xl">
          <span
            style={
              {
                "--value": Math.floor((timeLeft % (60 * 60)) / 60),
              } as {}
            }
          ></span>
        </span>
        min
      </div>
    </div>
  );
};
