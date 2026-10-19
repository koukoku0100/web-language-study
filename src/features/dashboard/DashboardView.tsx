"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { useAppSelector } from "@/store/hooks";
import styles from "./DashboardView.module.css";

const CONTENT_WIDTH_AT_1080 = 838;
const LOWER_LEFT_AT_1080 = 491;
const LOWER_RIGHT_AT_1080 = 327;
const LOWER_RATIO_TOTAL = LOWER_LEFT_AT_1080 + LOWER_RIGHT_AT_1080;

function metricWidths(count: number, inner: number, viewport: number): number[] {
  if (count === 0 || inner <= 0) {
    return [];
  }

  if (viewport < 560) {
    return Array.from({ length: count }, () => inner);
  }

  if (viewport < 960) {
    const pair = Math.max(0, inner - 14);
    const left = Math.floor(pair / 2);
    const right = pair - left;
    return Array.from({ length: count }, (_, index) => (index % 2 === 0 ? left : right));
  }

  const available = Math.max(0, inner - 14 * Math.max(0, count - 1));
  const base = Math.floor(available / count);
  const remainder = available - base * count;
  return Array.from({ length: count }, (_, index) =>
    index === count - 1 ? base + remainder : base,
  );
}

function lowerWidths(inner: number, viewport: number): {
  stacked: boolean;
  left: number;
  right: number;
} {
  if (viewport < 960) {
    return { stacked: true, left: inner, right: inner };
  }

  if (viewport >= 1080 && inner >= CONTENT_WIDTH_AT_1080) {
    return { stacked: false, left: LOWER_LEFT_AT_1080, right: LOWER_RIGHT_AT_1080 };
  }

  const available = Math.max(0, inner - 20);
  const left = Math.floor((available * LOWER_LEFT_AT_1080) / LOWER_RATIO_TOTAL);
  return { stacked: false, left, right: available - left };
}

export function DashboardView() {
  const dashboard = useAppSelector((state) => state.dashboard);
  const contentRef = useRef<HTMLDivElement>(null);
  const [viewport, setViewport] = useState(1080);
  const [inner, setInner] = useState(CONTENT_WIDTH_AT_1080);

  useEffect(() => {
    const element = contentRef.current;
    if (!element) {
      return;
    }

    const update = () => {
      setViewport(window.innerWidth);
      setInner(element.clientWidth);
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(element);
    window.addEventListener("resize", update);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  const cardWidths = metricWidths(dashboard.metrics.length, inner, viewport);
  const lower = lowerWidths(inner, viewport);
  const metricsStyle: CSSProperties = {
    flexWrap: viewport >= 960 ? "nowrap" : "wrap",
  };

  return (
    <div className={styles.content} ref={contentRef}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>{dashboard.title}</h1>
          <p className={styles.description}>{dashboard.description}</p>
        </div>
        {dashboard.showSampleDataBadge ? (
          <p className={styles.badge}>サンプルデータ</p>
        ) : null}
      </header>

      <div className={styles.metrics} style={metricsStyle}>
        {dashboard.metrics.map((metric, index) => (
          <section
            key={metric.id}
            className={styles.metric}
            style={{ width: cardWidths[index] }}
          >
            <p className={styles.metricLabel}>{metric.label}</p>
            <p className={styles.metricValue}>{metric.valueText}</p>
            <p className={styles.metricNote}>{metric.note}</p>
          </section>
        ))}
      </div>

      <div className={lower.stacked ? `${styles.lower} ${styles.lowerStacked}` : styles.lower}>
        <section
          className={styles.card}
          style={lower.stacked ? undefined : { width: lower.left }}
        >
          <h2 className={styles.cardTitle}>コース別の学習進捗</h2>
          {dashboard.courseProgresses.map((course) => (
            <div key={course.id} className={styles.courseRow}>
              <div className={styles.courseTop}>
                <p className={styles.courseName}>{course.courseName}</p>
                <p className={styles.courseRate}>
                  <span>平均進捗</span>
                  <span>{course.progressRate}%</span>
                </p>
              </div>
              <div className={styles.track}>
                <div
                  className={styles.fill}
                  style={{ width: `${course.progressRate}%` }}
                />
              </div>
              <p className={styles.courseMeta}>
                {course.lessonCount}レッスン ・ 受講中 {course.activeLearnerCount}名
              </p>
            </div>
          ))}
        </section>

        <section
          className={styles.card}
          style={lower.stacked ? undefined : { width: lower.right }}
        >
          <h2 className={`${styles.cardTitle} ${styles.pendingTitle}`}>公開待ちのレッスン</h2>
          {dashboard.pendingLessons.map((lesson) => (
            <div key={lesson.id} className={styles.pendingRow}>
              <div className={styles.pendingText}>
                <p className={styles.lessonTitle}>{lesson.title}</p>
                <p className={styles.lessonMeta}>
                  {lesson.courseName} ・ {lesson.updatedOn} 更新 ・ {lesson.editorName}
                </p>
                <button type="button" className={styles.edit}>
                  編集
                </button>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
