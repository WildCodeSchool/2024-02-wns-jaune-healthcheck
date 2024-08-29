import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CustomPagination from '@/components/custom/CustomPagination';


vi.mock('@/hooks/useScreenDimensions', () => ({
  default: () => ({ width: 1024 }) 
}));

describe('CustomPagination', () => {
  const defaultProps = {
    currentPage: 3,
    totalPages: 10,
    previousPage: 2,
    nextPage: 4,
    onPageChange: vi.fn(),
  };

  it('renders correctly', () => {
    render(<CustomPagination {...defaultProps} />);
    expect(screen.getByText('3')).toHaveAttribute('aria-current', 'page');
    expect(screen.getByText('Précédent')).toBeInTheDocument();
    expect(screen.getByText('Suivant')).toBeInTheDocument();
  });

  it('calls onPageChange with correct page number when clicking on a page', () => {
    render(<CustomPagination {...defaultProps} />);
    fireEvent.click(screen.getByText('4'));
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(4);
  });

  it('calls onPageChange with Previous page when clicking Précédent', () => {
    render(<CustomPagination {...defaultProps} />);
    fireEvent.click(screen.getByText('Précédent'));
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(2);
  });

  it('calls onPageChange with next page when clicking Next', () => {
    render(<CustomPagination {...defaultProps} />);
    fireEvent.click(screen.getByText('Suivant'));
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(4);
  });

  it('renders ellipsis when there are many pages', () => {
    render(<CustomPagination {...defaultProps} />);
    expect(screen.getAllByText('More pages')).toHaveLength(1);
  });

  it('renders first and last page numbers', () => {
    render(<CustomPagination {...defaultProps} />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });
});