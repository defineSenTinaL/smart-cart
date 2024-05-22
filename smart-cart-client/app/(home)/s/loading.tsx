import Image from "next/image";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center">
      <Image
        src={"/pacman.svg"}
        alt={"loading animation"}
        height={80}
        width={80}
      />
    </div>
  );
}
