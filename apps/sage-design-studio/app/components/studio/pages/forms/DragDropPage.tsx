'use client';

import { useState } from 'react';
import {
  DragDropList,
  DragDropTable,
  DragDropHandle,
  Card,
  Badge,
  CollapsibleCodeBlock,
  Button,
} from '@sage/ui';
import { GripVertical, RefreshCcw, Trash2 } from 'lucide-react';
import type { DragDropItem } from '@sage/ui';

interface TaskItem extends DragDropItem {
  id: string;
  name: string;
  status: 'pending' | 'in-progress' | 'done';
}

interface PersonItem extends DragDropItem {
  id: string;
  name: string;
  email: string;
  role: string;
}

const initialTasks: TaskItem[] = [
  { id: '1', name: 'Design landing page', status: 'done' },
  { id: '2', name: 'Implement authentication', status: 'in-progress' },
  { id: '3', name: 'Write documentation', status: 'pending' },
  { id: '4', name: 'Deploy to production', status: 'pending' },
];

const initialPeople: PersonItem[] = [
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com', role: 'Designer' },
  { id: '2', name: 'Bob Smith', email: 'bob@example.com', role: 'Developer' },
  { id: '3', name: 'Carol White', email: 'carol@example.com', role: 'Product Manager' },
  { id: '4', name: 'David Brown', email: 'david@example.com', role: 'Engineer' },
];

export function DragDropPage() {
  const [simpleTasks, setSimpleTasks] = useState<TaskItem[]>(initialTasks);
  const [handleTasks, setHandleTasks] = useState<TaskItem[]>(initialTasks);
  const [tablePeople, setTablePeople] = useState<PersonItem[]>(initialPeople);

  const handleResetAll = () => {
    setSimpleTasks(initialTasks);
    setHandleTasks(initialTasks);
    setTablePeople(initialPeople);
  };

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    'in-progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    done: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4 text-[var(--color-text-primary)]">
          Drag & Drop
        </h1>
        <p className="text-lg text-[var(--color-text-secondary)]">
          Sortable lists and tables with drag-and-drop functionality. Supports touch,
          mouse, and keyboard interactions with smooth animations.
        </p>
      </div>

      {/* Example 1: Simple List */}
      <Card className="p-8 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-[var(--color-text-primary)]">
            Simple Drag & Drop List
          </h2>
          <button
            className="p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
            onClick={handleResetAll}
            title="Reset all examples"
          >
            <RefreshCcw size={18} />
          </button>
        </div>

        <p className="text-sm text-[var(--color-text-muted)] mb-6">
          Click and drag any item to reorder. Works with mouse, touch, and keyboard.
        </p>

        {/* Preview Area */}
        <div className="bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl p-8 mb-6">
          <DragDropList
            items={simpleTasks}
            onReorder={setSimpleTasks}
            renderItem={(item, isDragging) => (
              <div
                className={`
                  p-4 bg-[var(--color-surface)] border border-[var(--color-border)]
                  rounded-lg cursor-grab active:cursor-grabbing
                  transition-shadow
                  ${isDragging ? 'shadow-lg ring-2 ring-[var(--color-primary)]' : 'hover:shadow-md'}
                `}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-[var(--color-text-primary)]">
                    {item.name}
                  </span>
                  <Badge className={statusColors[item.status]}>
                    {item.status}
                  </Badge>
                </div>
              </div>
            )}
          />
        </div>

        {/* Code Block */}
        <CollapsibleCodeBlock
          id="drag-drop-simple"
          title="Code"
          code={`import { DragDropList, Badge } from '@sage/ui';

const [tasks, setTasks] = useState([
  { id: '1', name: 'Design landing page', status: 'done' },
  { id: '2', name: 'Implement authentication', status: 'in-progress' },
  { id: '3', name: 'Write documentation', status: 'pending' },
]);

<DragDropList
  items={tasks}
  onReorder={setTasks}
  renderItem={(item, isDragging) => (
    <div className={\`
      p-4 bg-surface border rounded-lg cursor-grab
      \${isDragging ? 'shadow-lg ring-2 ring-primary' : 'hover:shadow-md'}
    \`}>
      <div className="flex items-center justify-between">
        <span>{item.name}</span>
        <Badge>{item.status}</Badge>
      </div>
    </div>
  )}
/>`}
          language="tsx"
          showCopy={true}
          defaultCollapsed={false}
        />
      </Card>

      {/* Example 2: List with Handle */}
      <Card className="p-8 mb-8">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-[var(--color-text-primary)] mb-2">
            Drag Handle
          </h2>
          <p className="text-sm text-[var(--color-text-muted)]">
            Only the handle area triggers dragging. Click elsewhere to interact with item content.
          </p>
        </div>

        {/* Preview Area */}
        <div className="bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl p-8 mb-6">
          <DragDropList
            items={handleTasks}
            onReorder={setHandleTasks}
            withHandle={true}
            renderItem={(item, isDragging) => (
              <div
                className={`
                  flex items-center gap-3 p-4 bg-[var(--color-surface)]
                  border border-[var(--color-border)] rounded-lg
                  transition-shadow
                  ${isDragging ? 'shadow-lg ring-2 ring-[var(--color-primary)]' : 'hover:shadow-sm'}
                `}
              >
                <div className="cursor-grab active:cursor-grabbing text-[var(--color-text-secondary)] hover:text-[var(--color-foreground)] transition-colors">
                  <GripVertical className="w-4 h-4" />
                </div>
                <div className="flex-1 flex items-center justify-between">
                  <span className="font-medium text-[var(--color-text-primary)]">
                    {item.name}
                  </span>
                  <Badge className={statusColors[item.status]}>
                    {item.status}
                  </Badge>
                </div>
                <button
                  className="p-1.5 text-[var(--color-text-secondary)] hover:text-red-600 transition-colors"
                  onClick={() => {
                    setHandleTasks(handleTasks.filter(t => t.id !== item.id));
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}
          />
        </div>

        {/* Code Block */}
        <CollapsibleCodeBlock
          id="drag-drop-handle"
          title="Code"
          code={`import { DragDropList } from '@sage/ui';
import { GripVertical } from 'lucide-react';

<DragDropList
  items={tasks}
  onReorder={setTasks}
  withHandle={true}
  renderItem={(item) => (
    <div className="flex items-center gap-3 p-4 bg-surface border rounded-lg">
      {/* Drag Handle */}
      <div className="cursor-grab">
        <GripVertical className="w-4 h-4" />
      </div>

      {/* Item Content */}
      <div className="flex-1">
        <span>{item.name}</span>
      </div>

      {/* Interactive Button (won't trigger drag) */}
      <button onClick={() => deleteItem(item.id)}>
        Delete
      </button>
    </div>
  )}
/>`}
          language="tsx"
          showCopy={true}
          defaultCollapsed={false}
        />
      </Card>

      {/* Example 3: Sortable Table */}
      <Card className="p-8 mb-8">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-[var(--color-text-primary)] mb-2">
            Sortable Table
          </h2>
          <p className="text-sm text-[var(--color-text-muted)]">
            Reorder table rows by dragging the handle in the first column.
          </p>
        </div>

        {/* Preview Area */}
        <div className="bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl p-8 mb-6 overflow-x-auto">
          <DragDropTable
            items={tablePeople}
            onReorder={setTablePeople}
            columns={[
              { key: 'name', header: 'Name' },
              { key: 'email', header: 'Email' },
              {
                key: 'role',
                header: 'Role',
                render: (item) => (
                  <Badge variant="secondary">{item.role}</Badge>
                ),
              },
            ]}
          />
        </div>

        {/* Code Block */}
        <CollapsibleCodeBlock
          id="drag-drop-table"
          title="Code"
          code={`import { DragDropTable, Badge } from '@sage/ui';

const [people, setPeople] = useState([
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com', role: 'Designer' },
  { id: '2', name: 'Bob Smith', email: 'bob@example.com', role: 'Developer' },
]);

<DragDropTable
  items={people}
  onReorder={setPeople}
  columns={[
    { key: 'name', header: 'Name' },
    { key: 'email', header: 'Email' },
    {
      key: 'role',
      header: 'Role',
      render: (item) => <Badge>{item.role}</Badge>,
    },
  ]}
/>`}
          language="tsx"
          showCopy={true}
          defaultCollapsed={false}
        />
      </Card>

      {/* Props Documentation */}
      <Card className="p-8">
        <h2 className="text-2xl font-semibold text-[var(--color-text-primary)] mb-6">
          API Reference
        </h2>

        <div className="space-y-8">
          {/* DragDropList Props */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
              DragDropList Props
            </h3>
            <div className="space-y-3">
              <div className="border-l-2 border-[var(--color-primary)] pl-4">
                <code className="text-sm font-mono text-[var(--color-primary)]">items</code>
                <p className="text-sm text-[var(--color-text-muted)] mt-1">
                  Array of items to display. Each item must have an <code>id</code> string property.
                </p>
              </div>
              <div className="border-l-2 border-[var(--color-primary)] pl-4">
                <code className="text-sm font-mono text-[var(--color-primary)]">onReorder</code>
                <p className="text-sm text-[var(--color-text-muted)] mt-1">
                  Callback fired when items are reordered. Receives the new array.
                </p>
              </div>
              <div className="border-l-2 border-[var(--color-primary)] pl-4">
                <code className="text-sm font-mono text-[var(--color-primary)]">renderItem</code>
                <p className="text-sm text-[var(--color-text-muted)] mt-1">
                  Function to render each item. Receives (item, isDragging) parameters.
                </p>
              </div>
              <div className="border-l-2 border-[var(--color-border)] pl-4">
                <code className="text-sm font-mono text-[var(--color-text-muted)]">
                  withHandle <span className="text-xs">(optional)</span>
                </code>
                <p className="text-sm text-[var(--color-text-muted)] mt-1">
                  Enable drag handle mode. Default: false
                </p>
              </div>
            </div>
          </div>

          {/* DragDropTable Props */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
              DragDropTable Props
            </h3>
            <div className="space-y-3">
              <div className="border-l-2 border-[var(--color-primary)] pl-4">
                <code className="text-sm font-mono text-[var(--color-primary)]">columns</code>
                <p className="text-sm text-[var(--color-text-muted)] mt-1">
                  Array of column configurations with <code>key</code>, <code>header</code>, and optional <code>render</code> function.
                </p>
              </div>
            </div>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
              Features
            </h3>
            <ul className="space-y-2 text-sm text-[var(--color-text-muted)]">
              <li className="flex items-start gap-2">
                <span className="text-[var(--color-primary)] mt-1">•</span>
                <span><strong>Touch Support:</strong> Works on mobile devices with swipe gestures</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--color-primary)] mt-1">•</span>
                <span><strong>Keyboard Accessible:</strong> Use arrow keys and Space to reorder</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--color-primary)] mt-1">•</span>
                <span><strong>Smooth Animations:</strong> Built-in transition effects during drag</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--color-primary)] mt-1">•</span>
                <span><strong>Drag Overlay:</strong> Visual feedback shows dragged item</span>
              </li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
