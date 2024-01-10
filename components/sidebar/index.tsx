"use client";
import Link from "next/link";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  IconButton,
  Drawer,
} from "@/ui/index";

import {
  IconInbox,
  IconX,
  IconReportAnalytics,
  IconUserCircle,
  IconSettings,
  IconBug,
  IconMenu,
} from "@tabler/icons-react";
import { useState } from "react";

const iconSize = "h-5 w-5";

const Links = ({ user }: { user: any }) => {
  return (
    <List>
      <Link href="/myErrors">
        <ListItem>
          <ListItemPrefix>
            <IconBug className={iconSize} />
          </ListItemPrefix>
          My Errors
        </ListItem>
      </Link>
      {user.role == "ADMIN" ? (
        <Link href="/adminDashboard">
          <ListItem>
            <ListItemPrefix>
              <IconReportAnalytics className={iconSize} />
            </ListItemPrefix>
            Admin Dashboard
          </ListItem>
        </Link>
      ) : (
        <></>
      )}

      <Link href="/profile">
        <ListItem>
          <ListItemPrefix>
            <IconUserCircle className={iconSize} />
          </ListItemPrefix>
          Profile
        </ListItem>
      </Link>
    </List>
  );
};

export default function Sidebar({ user }: { user: any }) {
  const [open, setOpen] = useState(false);

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  return (
    <>
      {/* md */}
      <aside className="md:hidden">
        <section className="p-3">
          <IconButton onClick={openDrawer}>
            <IconMenu className={iconSize} />
          </IconButton>
        </section>

        <Drawer open={open} onClose={closeDrawer}>
          <header className="w-full p-3 flex justify-end">
            <IconButton onClick={closeDrawer}>
              <IconX className={iconSize} />
            </IconButton>
          </header>

          <nav>
            <Links user={user} />
          </nav>
        </Drawer>
      </aside>

      {/* >md */}
      <aside className="hidden md:block h-full">
        <nav className="h-full">
          <Card className="w-full h-full p-4 rounded-none shadow-md bg-opacity-10">
            <Links user={user} />
          </Card>
        </nav>
      </aside>
    </>
  );
}
