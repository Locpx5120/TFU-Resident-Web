import React, { useMemo } from "react";
import PropTypes from "prop-types";
import {
  Table as MuiTable,
  TableBody,
  TableContainer,
  TableRow,
  TableCell,
  TablePagination,
  Checkbox,
  Typography,
  Box,
  Button,
  Backdrop,
  CircularProgress,
  TableSortLabel,
} from "@mui/material";
import JSonBox from "../JSonBox";
import colors from "../../assets/theme/base/colors";
import typography from "../../assets/theme/base/typography";
import borders from "../../assets/theme/base/borders";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";

function TableCustom({
  columns,
  rows,
  totalUsers,
  currentPage,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  onSelectAll,
  selectAllChecked,
  isLoading,
  sortColumn,
  sortDirection,
  onSort,
  onRowClick
}) {
  const { light } = colors;
  const { size, fontWeightBold } = typography;
  const { borderWidth } = borders;

  const paginatedRows = useMemo(() => rows, [rows]);

  const renderColumns = columns.map(
    ({ name, align, width, type, button, onButtonClick, sortable, esName }) => (
      <TableCell
        key={esName}
        align={align}
        width={width || "auto"}
        sx={{
          padding: "12px 16px",
          borderBottom: `${borderWidth[1]} solid ${light.main}`,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {type === "checkbox" && (
            <Checkbox checked={selectAllChecked} onChange={onSelectAll} />
          )}
          {sortable ? (
            <TableSortLabel
              active={sortColumn === esName}
              direction={sortColumn === esName ? sortDirection : 'asc'}
              onClick={() => onSort(esName)}
            >
              <Typography
                fontSize={size.xxs}
                fontWeight={fontWeightBold}
                color="#909399"
                sx={{ textTransform: 'uppercase' }}
              >
                {name}
              </Typography>
            </TableSortLabel>
          ) : (
            <Typography
              fontSize={size.xxs}
              fontWeight={fontWeightBold}
              color="#909399"
              sx={{ textTransform: 'uppercase' }}
            >
              {name}
            </Typography>
          )}
        </Box>
        {button && (
          <Button
            variant="contained"
            sx={{
              marginLeft: 1,
              color: "#ffff",
              backgroundColor: "rgb(37, 126, 229)",
              fontSize: "10px",
              padding: "5px 15px",
              minHeight: "25px",
              width: "auto",
              alignSelf: "flex-start",
              boxShadow: "none",
              marginLeft: "25px",
              "&:hover": {
                backgroundColor: "rgb(37, 126, 229)",
                transform: "scale(1)",
                boxShadow: "none",
              },
              "&:focus:not(:hover)": {
                backgroundColor: "rgb(37, 126, 229)",
                boxShadow: "none",
              },
              "& .MuiSvgIcon-root": {
                fontSize: "10px",
              },
            }}
            onClick={onButtonClick}
          >
            {button}
          </Button>
        )}
      </TableCell>
    )
  );

  const renderRows = paginatedRows?.length > 0 ? (
    paginatedRows.map((row, key) => (
      <TableRow key={`row-${key}`}>
        {columns.map(({ esName, align }) => (
          <TableCell
            key={esName}
            align={align}
            onClick={() => onRowClick(row)}
            style={{
              borderBottom: `${borderWidth[1]} solid ${light.main}`,
            }}
          >
            <Typography
              variant="button"
              fontWeight="regular"
              sx={{
                display: "inline-block",
                width: "max-content",
                color: "#000",
                "& .css-5sc49i-MuiTypography-root": { color: "#000" },
              }}
            >
              {row[esName]}
            </Typography>
          </TableCell>
        ))}
      </TableRow>
    ))
  ) : (
    <TableRow>
      <TableCell colSpan={columns.length} align="center">
        <Typography variant="body2" color="textSecondary">
          Không tìm thấy dữ liệu
        </Typography>
      </TableCell>
    </TableRow>
  );

  return (
    <Box>
      <TableContainer
        sx={{
          overflowX: "auto",
          maxWidth: "100%",
          boxShadow: "none",
          "&::-webkit-scrollbar": {
            height: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            borderRadius: "10px",
            transition: "height 0.2s ease-in-out",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            height: "12px",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "transparent",
          },
        }}
      >
        <MuiTable>
          <JSonBox component="thead">
            <TableRow>{renderColumns}</TableRow>
          </JSonBox>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length}>
                  <Backdrop
                    open={true}
                    sx={{
                      zIndex: (theme) => theme.zIndex.drawer + 1,
                      background: "rgba(255, 255, 255, 0.8)",
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <CircularProgress size={50} sx={{ color: "blue" }} />
                  </Backdrop>
                </TableCell>
              </TableRow>
            ) : (
              renderRows
            )}
          </TableBody>
        </MuiTable>
      </TableContainer>
      {totalUsers > 0 && (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalUsers}
          rowsPerPage={rowsPerPage}
          page={currentPage}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
          labelRowsPerPage="Mỗi trang"
          sx={{
            backgroundColor: "#ffffff",
            "& .MuiInputBase-root": {
              width: "auto !important",
            },
            "& .MuiTablePagination-actions": {
              marginLeft: "0",
            },
            "& .MuiTablePagination-toolbar": {
              width: "100%",
              padding: { xs: "8px 16px", sm: 2 },
              justifyContent: "space-between",
            },
            "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
              {
                fontSize: { xs: "0.75rem", sm: "1rem" },
              },
            "& .MuiInputBase-root-MuiTablePagination-select": {
              width: "auto !important",
            },
            "& .MuiTablePagination-root .MuiInputBase-root-MuiTablePagination-select":
              {
                margin: "0 8px",
              },
          }}
        />
      )}
    </Box>
  );
}

TableCustom.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  totalUsers: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func.isRequired,
  onSelectAll: PropTypes.func,
  selectAllChecked: PropTypes.bool,
  isLoading: PropTypes.bool,
  sortColumn: PropTypes.string,
  sortDirection: PropTypes.oneOf(["asc", "desc"]),
  onSort: PropTypes.func,
  onRowClick: PropTypes.func,
};

export default TableCustom;
