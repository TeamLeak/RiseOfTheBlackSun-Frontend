"use client";
import React, { useEffect, useState } from "react";
import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Spacer,
} from "@heroui/react";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";

import { title } from "@/components/primitives";

type NewsItem = {
  id: number;
  image: string;
  title: string;
  description: string;
  date: string;
  author: string;
  content: string;
  badge?: string;
  likes: number;
  user_voted: boolean;
};

const API_URL = "https://riseoftheblacksun.eu/api/blog_api.php";

const LikeCounter: React.FC<{
  newsId: number;
  likes: number;
  isLiked: boolean;
  onToggleLike: (newsId: number) => void;
}> = ({ newsId, likes = 0, isLiked = false, onToggleLike }) => {
  return (
    <div className="flex items-center gap-3">
      <div
        className="flex items-center justify-center w-10 h-10 border rounded-md"
        style={{
          minWidth: "40px",
          minHeight: "40px",
          textAlign: "center",
          lineHeight: "40px",
          fontSize: "14px",
          backgroundColor: isLiked ? "#333333" : "#1A1A1A",
          color: "#FFFFFF",
          borderColor: "#444444",
        }}
      >
        {likes}
      </div>
      <Button
        className={`${
          isLiked
            ? "bg-red-500 text-white hover:bg-red-600"
            : "bg-gray-700 text-white hover:bg-gray-600"
        } flex items-center`}
        radius="md"
        variant="flat"
        onPress={() => onToggleLike(newsId)}
      >
        {isLiked ? <AiFillLike size={20} /> : <AiOutlineLike size={20} />}
      </Button>
    </div>
  );
};

export default function PlayPage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>([]);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  useEffect(() => {
    fetchNews().then(() => {});
  }, []);

  const fetchNews = async () => {
    try {
      const response = await fetch(`${API_URL}?action=get_all_posts`);
      const data = await response.json();

      if (data.posts) {
        const posts = data.posts.map((post: any) => ({
          id: post.id,
          title: post.title,
          description: post.description,
          image: post.preview_url || "https://via.placeholder.com/400",
          date: post.published_date,
          author: post.author,
          content: post.content,
          badge: post.keywords,
          likes: post.rating || 0,
          user_voted: post.user_voted || false,
        }));

        setNewsData(posts);
        setFilteredNews(posts);
      }
    } catch (error) {}
  };

  const toggleLike = async (newsId: number) => {
    const newsItem = newsData.find((item) => item.id === newsId);

    if (!newsItem) return;

    const isCurrentlyLiked = newsItem.user_voted;
    const updatedLikes = isCurrentlyLiked
      ? newsItem.likes - 1
      : newsItem.likes + 1;

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "rate_post",
          post_id: newsId,
          rating: isCurrentlyLiked ? -1 : 1,
        }),
      });

      const result = await response.json();

      if (result.success) {
        const updatedNewsData = newsData.map((item) =>
          item.id === newsId
            ? { ...item, likes: updatedLikes, user_voted: !isCurrentlyLiked }
            : item,
        );

        setNewsData(updatedNewsData);
        setFilteredNews(updatedNewsData);
      } else {
      }
    } catch (error) {}
  };

  const openModal = (news: NewsItem) => {
    setSelectedNews(news);
    onOpen();
  };

  return (
    <div
      className="scroll-hidden"
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "20px",
        alignItems: "center",
      }}
    >
      <div style={{ maxWidth: "800px", width: "100%" }}>
        <h1 className={title()}>Новости проекта</h1>
        <Spacer y={10} />

        <div className="flex flex-col gap-6">
          {filteredNews.map((news) => (
            <Card
              key={news.id}
              isBlurred
              className="border-none bg-background/60 dark:bg-default-100/50"
              shadow="sm"
            >
              <CardBody>
                <div className="flex flex-col gap-4">
                  <img
                    alt="Новость"
                    className="object-cover rounded-md w-full h-[200px]"
                    src={news.image}
                  />
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold text-foreground/90">
                      {news.title}
                    </h3>
                    {news.badge && (
                      <div className="bg-gray-700 text-white px-2 py-1 rounded-md text-sm w-fit">
                        {news.badge}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-small text-foreground/70 mt-2">
                      {news.description}
                    </p>
                    <p className="text-xs text-foreground/50 mt-1">
                      Автор: {news.author}
                    </p>
                    <p className="text-xs text-foreground/50 mt-1">
                      Дата: {news.date}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <Button
                      className="bg-blue-500 text-white hover:bg-blue-600"
                      radius="md"
                      variant="flat"
                      onPress={() => openModal(news)}
                    >
                      Подробнее
                    </Button>
                    <LikeCounter
                      isLiked={news.user_voted}
                      likes={news.likes}
                      newsId={news.id}
                      onToggleLike={toggleLike}
                    />
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>

      {/* Модальное окно для новости */}
      {selectedNews && (
        <Modal
          isDismissable
          className="rounded-md"
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        >
          <ModalContent>
            <ModalHeader>{selectedNews.title}</ModalHeader>
            <ModalBody>
              <img
                alt="Новость"
                className="object-cover w-full rounded-md"
                src={selectedNews.image}
              />
              <p className="mt-4">{selectedNews.content}</p>
              <p className="text-sm text-foreground/50 mt-4">
                Автор: {selectedNews.author} | Дата: {selectedNews.date}
              </p>
            </ModalBody>
            <ModalFooter>
              <LikeCounter
                isLiked={selectedNews.user_voted}
                likes={selectedNews.likes}
                newsId={selectedNews.id}
                onToggleLike={toggleLike}
              />
              <Button
                className="bg-gray-500 text-white"
                onPress={() => onOpenChange()}
              >
                Закрыть
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
}
