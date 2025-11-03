import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const grade = String(body?.grade || '');
    if (!grade) return NextResponse.json([], { status: 200 });

    const res = await fetch('https://sisyaclass.xyz/student/get_big_course_web_by_grade', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ grade })
    });
    if (!res.ok) {
      return NextResponse.json({ courses: [] }, { status: 200 });
    }
    const raw = await res.json();
    const list: any[] = Array.isArray(raw) ? raw : Array.isArray(raw?.courses) ? raw.courses : (raw ? [raw] : []);

    // Build simplified list with label + inferred type
    const courses = list.map((item) => {
      const label = item?.webLabel || item?.bigCourse?.name || '';
      const name = String(item?.bigCourse?.name || label || '').toLowerCase();
      const tags: string[] = Array.isArray(item?.bigCourse?.searchTags) ? item.bigCourse.searchTags.map((t: any)=>String(t).toLowerCase()) : [];
      const text = `${name} ${label} ${tags.join(' ')}`;
      let type: 'booster'|'math-longterm'|'master' = 'booster';
      if (text.includes('math')) type = 'math-longterm';
      else if (text.includes('master')) type = 'master';
      return { label, type };
    }).filter((c)=>c.label);

    return NextResponse.json({ courses }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ courses: [] }, { status: 200 });
  }
}


