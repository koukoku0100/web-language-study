"use client";

import { useState } from "react";
import { useAppSelector } from "@/store/hooks";
import { Button } from "@/components/button/Button";
import { Card } from "@/components/card/Card";
import { CardHeading } from "@/components/card-heading/CardHeading";
import { DataTableCell, DataTableHeader, DataTableRow } from "@/components/data-table/DataTable";
import { FieldLabel } from "@/components/field/FieldLabel";
import { SelectField } from "@/components/field/SelectField";
import { TextArea } from "@/components/field/TextArea";
import { TextInput } from "@/components/field/TextInput";
import { ListCount } from "@/components/list-count/ListCount";
import { PageTitle } from "@/components/page-title/PageTitle";
import { SampleBadge } from "@/components/sample-badge/SampleBadge";
import { StatusBadge } from "@/components/status-badge/StatusBadge";
import { formatMonthDay } from "@/features/calendar-date/calendarDate";
import { isLessonStatus, lessonStatusOptions } from "@/features/lesson-status/lessonStatus";
import type { LessonStatus } from "@/features/lesson-status/lessonStatus";
import type { QuestionChoice, QuestionFormat, QuestionStatusFilter } from "./types";
import styles from "./QuestionBankView.module.css";

const QUESTION_COLUMNS = "81px 351px 169px 73px 62px 66px";
const QUESTION_STATUS_EXCLUDED: readonly LessonStatus[] = ["private"];

const FORMAT_LABEL: Record<QuestionFormat, string> = {
  multiple_choice: "選択式",
  fill_in_blank: "穴埋め",
};

function formatLabel(format: string) {
  if (format === "multiple_choice" || format === "fill_in_blank") {
    return FORMAT_LABEL[format];
  }
  return "";
}

function isQuestionStatusFilter(value: string): value is QuestionStatusFilter {
  return value === "all" || isLessonStatus(value);
}

export function QuestionBankView() {
  const questionBank = useAppSelector((state) => state.questionBank);
  const draftSource = questionBank.questionDraft;
  const [courseId, setCourseId] = useState(questionBank.selectedCourseId);
  const [formatId, setFormatId] = useState(questionBank.selectedFormatId);
  const [statusId, setStatusId] = useState<QuestionStatusFilter>(questionBank.selectedStatusId);
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
        <PageTitle
          title={questionBank.title}
          description={questionBank.description}
          descriptionClassName={styles.nowrap}
        />
        <div className={styles.headerActions}>
          {questionBank.showSampleDataBadge ? <SampleBadge /> : null}
          <div className={styles.headerButtons}>
            <Button variant="secondary" className={styles.headerButton} onClick={() => {}}>
              CSVで一括登録
            </Button>
            <Button variant="primary" className={styles.headerButton} onClick={() => {}}>
              問題を追加
            </Button>
          </div>
        </div>
      </header>

      <Card className={styles.listCard}>
        <CardHeading className={styles.listHeading}>問題一覧</CardHeading>
        <div className={styles.filters}>
          <div className={styles.filterCourse}>
            <FieldLabel htmlFor="WELG0130-course">コース</FieldLabel>
            <SelectField
              id="WELG0130-course"
              className={styles.full}
              value={courseId}
              options={questionBank.courseOptions}
              onChange={setCourseId}
            />
          </div>
          <div className={styles.filterFormat}>
            <FieldLabel htmlFor="WELG0130-format">形式</FieldLabel>
            <SelectField
              id="WELG0130-format"
              className={styles.full}
              value={formatId}
              options={questionBank.formatOptions}
              onChange={setFormatId}
            />
          </div>
          <div className={styles.filterStatus}>
            <FieldLabel htmlFor="WELG0130-status">状態</FieldLabel>
            <SelectField
              id="WELG0130-status"
              className={styles.full}
              value={statusId}
              options={[{ id: "all", label: "すべて" }, ...lessonStatusOptions(QUESTION_STATUS_EXCLUDED)]}
              onChange={(value) => {
                if (isQuestionStatusFilter(value)) {
                  setStatusId(value);
                }
              }}
            />
          </div>
        </div>

        <DataTableHeader style={{ gridTemplateColumns: QUESTION_COLUMNS }}>
          <DataTableCell>ID</DataTableCell>
          <DataTableCell>問題文</DataTableCell>
          <DataTableCell>レッスン</DataTableCell>
          <DataTableCell>形式</DataTableCell>
          <DataTableCell>状態</DataTableCell>
          <DataTableCell>更新日</DataTableCell>
        </DataTableHeader>
        {questionBank.questions.map((question) => {
          return (
            <DataTableRow
              key={question.id}
              className={question.selected ? styles.selectedRow : undefined}
              style={{ gridTemplateColumns: QUESTION_COLUMNS }}
            >
              <DataTableCell>{question.id}</DataTableCell>
              <DataTableCell>{question.prompt}</DataTableCell>
              <DataTableCell>
                {question.lessonOrder} {question.lessonName}
              </DataTableCell>
              <DataTableCell>{formatLabel(question.format)}</DataTableCell>
              <DataTableCell>
                {question.status === "published" ? (
                  <StatusBadge tone={question.status} className={styles.badgePublished} />
                ) : null}
                {question.status === "draft" ? (
                  <StatusBadge tone={question.status} className={styles.badgeDraft} />
                ) : null}
                {question.status === "private" ? (
                  <StatusBadge tone={question.status} className={styles.badgePrivate} />
                ) : null}
              </DataTableCell>
              <DataTableCell>{formatMonthDay(question.updatedOn)}</DataTableCell>
            </DataTableRow>
          );
        })}
        <ListCount count={questionBank.questions.length} />
      </Card>

      <Card className={styles.editCard}>
        <CardHeading className={styles.editHeading}>問題を編集（{draftSource.questionId}）</CardHeading>
        <div className={styles.columns}>
          <div className={styles.column}>
            <FieldLabel htmlFor="WELG0130-prompt">問題文</FieldLabel>
            <TextArea
              id="WELG0130-prompt"
              className={`${styles.textarea} ${styles.promptInput}`}
              value={prompt}
              onChange={setPrompt}
            />
            <FieldLabel className={styles.explanationLabel} htmlFor="WELG0130-explanation">
              解説
            </FieldLabel>
            <TextArea
              id="WELG0130-explanation"
              className={`${styles.textarea} ${styles.explanationInput}`}
              value={explanation}
              onChange={setExplanation}
            />
          </div>
          <div className={styles.column}>
            <FieldLabel className={styles.choiceLabel}>選択肢（正解を1つ選択）</FieldLabel>
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
                  <TextInput
                    id={`WELG0130-choice-${choice.id}`}
                    className={styles.choiceInput}
                    value={choice.text}
                    onChange={(text) => {
                      updateChoiceText(choice.id, text);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.divider} />
        <div className={styles.footerActions}>
          <Button variant="secondary" className={styles.headerButton} onClick={() => {}}>
            下書きとして保存
          </Button>
          <Button variant="primary" className={styles.headerButton} onClick={() => {}}>
            保存して公開
          </Button>
        </div>
      </Card>
    </div>
  );
}
