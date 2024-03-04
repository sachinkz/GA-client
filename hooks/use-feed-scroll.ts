import { useEffect, useState } from "react";

type ChatScrollProps = {
    feedsDiv: React.RefObject<HTMLDivElement>
    shouldLoadMore: boolean;
    loadMore: () => void;
}

export const useFeedScroll = ({
    feedsDiv, shouldLoadMore, loadMore
}: ChatScrollProps) => {


     useEffect(() => {
        const feedDiv = feedsDiv?.current;
        const handleScroll = () => {
            const scrollHeight = feedDiv?.scrollHeight;
            const scrollTop = feedDiv?.scrollTop;
            const clientHeight = feedDiv?.clientHeight;
            //@ts-ignore
            if (scrollTop + clientHeight === scrollHeight) {
                loadMore()
              }
        };

        feedDiv?.addEventListener("scroll", handleScroll);
        return () => feedDiv?.removeEventListener("scroll", handleScroll);

    }, [shouldLoadMore, loadMore, feedsDiv]);

}