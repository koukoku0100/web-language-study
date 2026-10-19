"use client";

import { useState } from "react";
import { useAppSelector } from "@/store/hooks";
import type { LessonStatus, QuestionChoice, QuestionFormat } from "./types";
import styles from "./QuestionBankView.module.css";

const FORMAT_LABEL: Record<QuestionFormat, string> = {
  multiple_choice: "選択式",
  fill_in_blank: "穴埋め",
};

const STATUS_BADGE: Record<LessonStatus, { label: string; className: string }> = {
  published: { label: "公開", className: styles.badgePublished },
  draft: { label: "下書き", className: styles.badgeDraft },
  private: { label: "非公開", className: styles.badgePrivate },
};

function formatLabel(format: string) {
  if (format === "multiple_choice" || format === "fill_in_blank") {
    return FORMAT_LABEL[format];
  }
  return "";
}

function statusBadge(status: string) {
  if (status === "published" || status === "draft" || status === "private") {
    return STATUS_BADGE[status];
  }
  return null;
}

export function QuestionBankView() {
  const questionBank = useAppSelector((state) => state.questionBank);
  const draftSource = questionBank.questionDraft;
  const [courseId, setCourseId] = useState(questionBank.selectedCourseId);
  const [formatId, setFormatId] = useState(questionBank.selectedFormatId);
  const [statusId, setStatusId] = useState(questionBank.selectedStatusId);
  const [prompt, setPrompt] = useState(draftSource.prompt);
  const [explanation, setExplanation] = useState(draftSource.explanation);
  const [choices, setChoices] = useState<QuestionChoice[]>(() =>
    draftSource.choices.map((choice) => ({ ...choice })),
  );

  function selectCorrect(choiceId: string) {
    setChoices((current) =>
      current.map((choice) => ({
        ...choice,
        selectedAsCorrect: choice.id === choiceId,
      })),
    );
  }

  function updateChoiceText(choiceId: string, text: string) {
    setChoices((current) =>
      current.map((choice) => (choice.id === choiceId ? { ...choice, text } : choice)),
    );
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>{questionBank.title}</h1>
          <p className={styles.description}>{questionBank.description}</p>
        </div>
        <div className={styles.headerActions}>
          {questionBank.showSampleDataBadge ? <p className={styles.sampleBadge}>サンプルデータ</p> : null}
          <div className={styles.headerButtons}>
            <button type="button" className={styles.secondaryButton}>
              CSVで一括登録
            </button>
            <button type="button" className={styles.primaryButton}>
              問題を追加
            </button>
          </div>
        </div>
      </header>

      <section className={styles.listCard}>
        <h2 className={styles.listHeading}>問題一覧</h2>
        <div className={styles.filters}>
          <div className={styles.filterCourse}>
            <label className={styles.label} htmlFor="WELG0130-course">
              コース
            </label>
            <select
              id="WELG0130-course"
              className={styles.select}
              value={courseId}
              onChange={(event) => {
                setCourseId(event.target.value);
              }}
            >
              {questionBank.courseOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.filterFormat}>
            <label className={styles.label} htmlFor="WELG0130-format">
              形式
            </label>
            <select
              id="WELG0130-format"
              className={styles.select}
              value={formatId}
              onChange={(event) => {
                setFormatId(event.target.value);
              }}
            >
              {questionBank.formatOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.filterStatus}>
            <label className={styles.label} htmlFor="WELG0130-status">
              状態
            </label>
            <select
              id="WELG0130-status"
              className={styles.select}
              value={statusId}
              onChange={(event) => {
                setStatusId(event.target.value);
              }}
            >
              {questionBank.statusOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.table}>
          <div className={styles.headRow}>
            <span>ID</span>
            <span>問題文</span>
            <span>レッスン</span>
            <span>形式</span>
            <span>状態</span>
            <span>更新日</span>
          </div>
          {questionBank.questions.map((question) => {
            const badge = statusBadge(question.status);
            return (
              <div
                key={question.id}
                className={question.selected ? styles.selectedRow : styles.dataRow}
              >
                <span>{question.id}</span>
                <span>{question.prompt}</span>
                <span>
                  {question.lessonOrder} {question.lessonName}
                </span>
                <span>{formatLabel(question.format)}</span>
                <span>
                  {badge ? <span className={`${styles.statusBadge} ${badge.className}`}>{badge.label}</span> : null}
                </span>
                <span>{question.updatedOn}</span>
              </div>
            );
          })}
        </div>
        {questionBank.questions.length > 0 ? (
          <p className={styles.count}>1〜{questionBank.questions.length}件を表示</p>
        ) : null}
      </section>

      <section className={styles.editCard}>
        <h2 className={styles.editHeading}>問題を編集（{draftSource.questionId}）</h2>
        <div className={styles.columns}>
          <div className={styles.column}>
            <label className={styles.label} htmlFor="WELG0130-prompt">
              問題文
            </label>
            <textarea
              id="WELG0130-prompt"
              className={`${styles.textarea} ${styles.promptInput}`}
              rows={4}
              value={prompt}
              onChange={(event) => {
                setPrompt(event.target.value);
              }}
            />
            <label className={`${styles.label} ${styles.explanationLabel}`} htmlFor="WELG0130-explanation">
              解説
            </label>
            <textarea
              id="WELG0130-explanation"
              className={`${styles.textarea} ${styles.explanationInput}`}
              rows={3}
              value={explanation}
              onChange={(event) => {
                setExplanation(event.target.value);
              }}
            />
          </div>
          <div className={styles.column}>
            <p className={`${styles.label} ${styles.choiceLabel}`}>選択肢（正解を1つ選択）</p>
            <div className={styles.choices}>
              {choices.map((choice) => (
                <div key={choice.id} className={styles.choiceRow}>
                  <input
                    className={styles.radio}
                    type="radio"
                    name="WELG0130-correct"
                    checked={choice.selectedAsCorrect}
                    onChange={() => {
                      selectCorrect(choice.id);
                    }}
                  />
                  <span className={styles.choiceMark}>{choice.id}</span>
                  <input
                    className={styles.choiceInput}
                    type="text"
                    value={choice.text}
                    onChange={(event) => {
                      updateChoiceText(choice.id, event.target.value);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.divider} />
        <div className={styles.footerActions}>
          <button type="button" className={styles.secondaryButton}>
            下書きとして保存
          </button>
          <button type="button" className={styles.primaryButton}>
            保存して公開
          </button>
        </div>
      </section>
    </div>
  );
}
