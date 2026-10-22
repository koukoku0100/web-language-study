"use client";

import { useRef, useState } from "react";
import { useAppSelector } from "@/store/hooks";
import { Button } from "@/components/button/Button";
import { Card } from "@/components/card/Card";
import { CardHeading } from "@/components/card-heading/CardHeading";
import { FieldLabel } from "@/components/field/FieldLabel";
import { SelectField } from "@/components/field/SelectField";
import { TextArea } from "@/components/field/TextArea";
import { TextInput } from "@/components/field/TextInput";
import { PageTitle } from "@/components/page-title/PageTitle";
import { SampleBadge } from "@/components/sample-badge/SampleBadge";
import { StatusBadge } from "@/components/status-badge/StatusBadge";
import { isLessonStatus, lessonStatusOptions } from "@/features/lesson-status/lessonStatus";
import type { LessonStatus } from "@/features/lesson-status/lessonStatus";
import styles from "./CourseLessonView.module.css";

export function CourseLessonView() {
  const courseLesson = useAppSelector((state) => state.courseLesson);
  const draftSource = courseLesson.lessonDraft;
  const [courseId, setCourseId] = useState(courseLesson.selectedCourseId);
  const [lessonName, setLessonName] = useState(draftSource.lessonName);
  const [videoUrl, setVideoUrl] = useState(draftSource.videoUrl);
  const [publishStatusId, setPublishStatusId] = useState<LessonStatus>(draftSource.publishStatusId);
  const [displayOrder, setDisplayOrder] = useState<number | null>(draftSource.displayOrder);
  const [displayOrderText, setDisplayOrderText] = useState<string | null>(null);
  const displayOrderComposing = useRef(false);
  const [description, setDescription] = useState(draftSource.description);

  function applyDisplayOrder(value: string) {
    const digits = value.replace(/\D/g, "");
    setDisplayOrder(digits.length === 0 ? null : Number(digits));
    setDisplayOrderText(null);
  }

  function changeDisplayOrder(value: string) {
    if (displayOrderComposing.current) {
      setDisplayOrderText(value);
      return;
    }
    applyDisplayOrder(value);
  }

  return (
    <div className={styles.scroll}>
      <div className={styles.page}>
        <header className={styles.header}>
          <PageTitle
            title={courseLesson.title}
            description={courseLesson.description}
            descriptionClassName={styles.nowrap}
          />
          <div className={styles.headerActions}>
            {courseLesson.showSampleDataBadge ? <SampleBadge /> : null}
            <Button variant="primary" onClick={() => {}}>
              コースを追加
            </Button>
          </div>
        </header>

        <div className={styles.columns}>
          <Card className={styles.listCard}>
            <CardHeading className={styles.listHeading}>レッスン一覧</CardHeading>
            <FieldLabel htmlFor="WELG0120-course">コース</FieldLabel>
            <SelectField
              id="WELG0120-course"
              className={styles.full}
              value={courseId}
              options={courseLesson.courseOptions.map((course) => ({
                id: course.id,
                label: `${course.courseName}（${course.lessonCount}レッスン）`,
              }))}
              onChange={setCourseId}
            />
            <div className={styles.lessonList}>
              {courseLesson.lessons.map((lesson) => {
                return (
                  <div
                    key={lesson.id}
                    className={lesson.selected ? `${styles.lessonRow} ${styles.lessonRowSelected}` : styles.lessonRow}
                  >
                    <span className={styles.orderNumber}>{lesson.orderNumber}</span>
                    <span className={styles.lessonName}>{lesson.name}</span>
                    <StatusBadge tone={lesson.status} className={styles.lessonBadge} />
                  </div>
                );
              })}
            </div>
            <Button variant="secondary" className={styles.addLesson} onClick={() => {}}>
              レッスンを追加
            </Button>
          </Card>

          <Card className={styles.editCard}>
            <CardHeading className={styles.editHeading}>レッスンを編集</CardHeading>
            <FieldLabel htmlFor="WELG0120-lesson-name">レッスン名</FieldLabel>
            <TextInput
              id="WELG0120-lesson-name"
              className={styles.full}
              value={lessonName}
              onChange={setLessonName}
            />

            <FieldLabel className={styles.followingLabel} htmlFor="WELG0120-video-url">
              動画URL（YouTube）
            </FieldLabel>
            <TextInput
              id="WELG0120-video-url"
              className={styles.full}
              value={videoUrl}
              placeholder="https://www.youtube.com/watch?v="
              onChange={setVideoUrl}
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
                <FieldLabel htmlFor="WELG0120-publish-status">公開状態</FieldLabel>
                <SelectField
                  id="WELG0120-publish-status"
                  className={styles.narrow}
                  value={publishStatusId}
                  options={lessonStatusOptions()}
                  onChange={(value) => {
                    if (isLessonStatus(value)) {
                      setPublishStatusId(value);
                    }
                  }}
                />
              </div>
              <div>
                <FieldLabel htmlFor="WELG0120-display-order">表示順</FieldLabel>
                <TextInput
                  id="WELG0120-display-order"
                  className={styles.narrow}
                  value={displayOrderText !== null ? displayOrderText : displayOrder === null ? "" : String(displayOrder)}
                  onCompositionStart={(value) => {
                    displayOrderComposing.current = true;
                    setDisplayOrderText(value);
                  }}
                  onCompositionEnd={(value) => {
                    displayOrderComposing.current = false;
                    applyDisplayOrder(value);
                  }}
                  onChange={changeDisplayOrder}
                />
              </div>
            </div>

            <FieldLabel className={styles.followingLabel} htmlFor="WELG0120-description">
              レッスンの説明
            </FieldLabel>
            <TextArea
              id="WELG0120-description"
              className={styles.textarea}
              value={description}
              onChange={setDescription}
            />

            <FieldLabel className={styles.linkLabel}>紐づく問題集</FieldLabel>
            <div className={styles.linkRow}>
              {draftSource.linkedQuestionSets.map((set) => (
                <span key={set.id} className={styles.questionBadge}>
                  {set.label}
                </span>
              ))}
              <Button variant="secondary" className={styles.linkButton} onClick={() => {}}>
                問題集を紐づける
              </Button>
            </div>
            <div className={styles.footerActions}>
              <Button variant="secondary" className={styles.boldButton} onClick={() => {}}>
                下書きとして保存
              </Button>
              <Button variant="primary" className={styles.boldButton} onClick={() => {}}>
                公開する
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
