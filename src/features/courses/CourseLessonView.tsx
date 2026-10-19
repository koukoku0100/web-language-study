"use client";

import { useState } from "react";
import { useAppSelector } from "@/store/hooks";
import type { LessonStatus } from "./types";
import styles from "./CourseLessonView.module.css";

const STATUS_BADGE: Record<LessonStatus, { label: string; className: string }> = {
  published: { label: "公開", className: styles.badgePublished },
  draft: { label: "下書き", className: styles.badgeDraft },
  private: { label: "非公開", className: styles.badgePrivate },
};

function statusBadge(status: string) {
  if (status === "published" || status === "draft" || status === "private") {
    return STATUS_BADGE[status];
  }
  return null;
}

export function CourseLessonView() {
  const courseLesson = useAppSelector((state) => state.courseLesson);
  const draftSource = courseLesson.lessonDraft;
  const [courseId, setCourseId] = useState(courseLesson.selectedCourseId);
  const [lessonName, setLessonName] = useState(draftSource.lessonName);
  const [videoUrl, setVideoUrl] = useState(draftSource.videoUrl);
  const [publishStatusId, setPublishStatusId] = useState(draftSource.publishStatusId);
  const [displayOrder, setDisplayOrder] = useState(draftSource.displayOrder);
  const [description, setDescription] = useState(draftSource.description);

  return (
    <div className={styles.scroll}>
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>{courseLesson.title}</h1>
          <p className={styles.description}>{courseLesson.description}</p>
        </div>
        <div className={styles.headerActions}>
          {courseLesson.showSampleDataBadge ? <p className={styles.sampleBadge}>サンプルデータ</p> : null}
          <button type="button" className={styles.primaryButton}>
            コースを追加
          </button>
        </div>
      </header>

      <div className={styles.columns}>
        <section className={styles.listCard}>
          <h2 className={styles.listHeading}>レッスン一覧</h2>
          <label className={styles.label} htmlFor="WELG0120-course">
            コース
          </label>
          <select
            id="WELG0120-course"
            className={styles.select}
            value={courseId}
            onChange={(event) => {
              setCourseId(event.target.value);
            }}
          >
            {courseLesson.courseOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
          <div className={styles.lessonList}>
            {courseLesson.lessons.map((lesson) => {
              const badge = statusBadge(lesson.status);
              return (
                <div
                  key={lesson.id}
                  className={lesson.selected ? `${styles.lessonRow} ${styles.lessonRowSelected}` : styles.lessonRow}
                >
                  <span className={styles.orderNumber}>{lesson.orderNumber}</span>
                  <span className={styles.lessonName}>{lesson.name}</span>
                  {badge ? <span className={`${styles.statusBadge} ${badge.className}`}>{badge.label}</span> : null}
                </div>
              );
            })}
          </div>
          <button type="button" className={styles.addLesson}>
            レッスンを追加
          </button>
        </section>

        <section className={styles.editCard}>
          <h2 className={styles.editHeading}>レッスンを編集</h2>
          <label className={styles.label} htmlFor="WELG0120-lesson-name">
            レッスン名
          </label>
          <input
            id="WELG0120-lesson-name"
            className={styles.input}
            type="text"
            value={lessonName}
            onChange={(event) => {
              setLessonName(event.target.value);
            }}
          />

          <label className={`${styles.label} ${styles.followingLabel}`} htmlFor="WELG0120-video-url">
            動画URL（YouTube）
          </label>
          <input
            id="WELG0120-video-url"
            className={`${styles.input} ${styles.videoInput}`}
            type="text"
            value={videoUrl}
            placeholder="https://www.youtube.com/watch?v="
            onChange={(event) => {
              setVideoUrl(event.target.value);
            }}
          />
          <p className={styles.note}>URLを入力すると、アプリの学習画面に動画が埋め込まれます。</p>
          <div className={styles.preview}>
            <svg className={styles.play} width="26" height="26" viewBox="0 0 26 26" aria-hidden="true">
              <path d="M9 6.5v13l11-6.5-11-6.5z" />
            </svg>
            <p className={styles.previewText}>動画プレビュー（URL入力後に表示）</p>
          </div>

          <div className={styles.split}>
            <div>
              <label className={styles.label} htmlFor="WELG0120-publish-status">
                公開状態
              </label>
              <select
                id="WELG0120-publish-status"
                className={`${styles.select} ${styles.publishSelect}`}
                value={publishStatusId}
                onChange={(event) => {
                  setPublishStatusId(event.target.value);
                }}
              >
                {courseLesson.publishStatusOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={styles.label} htmlFor="WELG0120-display-order">
                表示順
              </label>
              <input
                id="WELG0120-display-order"
                className={styles.input}
                type="text"
                value={displayOrder}
                onChange={(event) => {
                  setDisplayOrder(event.target.value);
                }}
              />
            </div>
          </div>

          <label className={`${styles.label} ${styles.followingLabel}`} htmlFor="WELG0120-description">
            レッスンの説明
          </label>
          <textarea
            id="WELG0120-description"
            className={styles.textarea}
            rows={4}
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          />

          <p className={`${styles.label} ${styles.linkLabel}`}>紐づく問題集</p>
          <div className={styles.linkRow}>
            {draftSource.linkedQuestionSets.map((set) => (
              <span key={set.id} className={styles.questionBadge}>
                {set.label}
              </span>
            ))}
            <button type="button" className={styles.linkButton}>
              問題集を紐づける
            </button>
          </div>
          <div className={styles.footerActions}>
            <button type="button" className={styles.secondaryButton}>
              下書きとして保存
            </button>
            <button type="button" className={`${styles.primaryButton} ${styles.publishButton}`}>
              公開する
            </button>
          </div>
        </section>
      </div>
    </div>
    </div>
  );
}
