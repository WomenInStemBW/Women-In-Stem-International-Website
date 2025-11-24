// src/components/SortableTableRow.jsx
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const SortableTableRow = ({ 
  member, 
  index, 
  onEdit, 
  onDelete, 
  onMove,
  isDragging,
  totalMembers // Add this prop
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: member.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    backgroundColor: isDragging ? '#f8f9fa' : 'transparent',
    opacity: isDragging ? 0.6 : 1,
  };

  return (
    <tr ref={setNodeRef} style={style}>
      <td>
        <div className="d-flex align-items-center gap-2">
          <span className="badge bg-primary">{index + 1}</span>
          <button
            {...attributes}
            {...listeners}
            className="btn btn-sm btn-outline-secondary border-0"
            style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
            title="Drag to reorder"
          >
            ⠿
          </button>
        </div>
      </td>
      <td>
        {member.image_url ? (
          <img
            src={member.image_url}
            alt={member.name}
            style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '50%' }}
          />
        ) : (
          <div
            style={{
              width: '50px',
              height: '50px',
              backgroundColor: '#f8f9fa',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#6c757d',
              fontSize: '12px'
            }}
          >
            No Image
          </div>
        )}
      </td>
      <td>
        <strong>{member.name}</strong>
      </td>
      <td>{member.role || '-'}</td>
      <td>
        {member.bio && member.bio.length > 50
          ? `${member.bio.substring(0, 50)}...`
          : member.bio || '-'}
      </td>
      <td>
        <div className="btn-group">
          <button
            onClick={() => onMove(member.id, 'up')}
            disabled={index === 0}
            className="btn btn-sm btn-outline-secondary"
            title="Move up"
          >
            ↑
          </button>
          <button
            onClick={() => onMove(member.id, 'down')}
            disabled={index === totalMembers - 1} // Use totalMembers instead of members.length
            className="btn btn-sm btn-outline-secondary"
            title="Move down"
          >
            ↓
          </button>
          <button
            onClick={() => onEdit(member)}
            className="btn btn-sm btn-outline-primary"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(member.id)}
            className="btn btn-sm btn-outline-danger"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default SortableTableRow;